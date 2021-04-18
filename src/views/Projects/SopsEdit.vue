<template>
  <div>
    <h3 style="font-weight: 500;">Manage SOPS</h3>
    <v-divider></v-divider>
    <div v-if="project.sops && project.sops.length">
    <div
        v-for="sops in project.sops"
        v-bind:key="sops.title"
        tile
      >
      <v-list max-width="800" class="sops-list">
        <v-list-item two-line class="pl-0">
          <v-list-item-content class="sops-list-item">
            <v-list-item-title>
              {{ sops.title }}
              <v-btn
                  outlined
                  plain
                  color="#a1a9b2"
                  width="144"
                  right
                  absolute
                  @click="handleSetEditSops(sops)"
                >
                  <v-icon size="24" class="mr-2">
                    $vuetify.icons.edit
                  </v-icon>
                  Edit Sops
                </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle> {{ sops.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </div>
    </div>
    <v-btn
      v-if="!showForm"
      large
      color="primary"
      @click="handleShowForm(true)"
    >Add Sops</v-btn>
    <v-row>
      <v-col cols="6">
        <v-form class="py-4 white create-form" v-if="showForm">
          <v-row>
          <v-col>
            <h3>{{ headlinePrefix }} SOPS: {{ title }}</h3>
            <v-divider class="mb-6"></v-divider>
              <v-select
                :label="$t('SOPS Type')"
                name="specType"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter Sops Type')"
                v-model="sopsType"
                :items="sopsTypeChoices"
              />
          <v-text-field
                :label="$t('Title')"
                name="sopsName"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter Sops Title')"
                v-model="title"
                @blur="$v.title.$touch()"
                prepend-inner-icon="$vuetify.icons.projectInput"
              />
          <v-text-field
                :label="$t('Description')"
                name="description"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter sops Description')"
                v-model="description"
                prepend-inner-icon="$vuetify.icons.description"
              />
          <v-text-field
              v-if="sopsType"
                :label="secret1Label"
                name="secret1"
                filled
                outlined
                type="password"
                :placeholder="secret1Placeholder"
                v-model="secret1"
                prepend-inner-icon="$vuetify.icons.accessToken"
              />
            <v-text-field
                v-if="sopsType === 'aws'"
                :label="secret2Label"
                name="secret2"
                filled
                outlined
                type="password"
                :placeholder="secret2Placeholder"
                v-model="secret2"
                prepend-inner-icon="$vuetify.icons.accessToken"
              />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="10">
              <v-btn
                plain
                color="white"
                elevation="0"
                @click="handleShowForm(false)"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="2">
              <v-btn
              large
              color="primary"
              @click="submit"
            >Save</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  CreateUpdateSops,
  Maybe, TCreateUpdateSopsMutationVariables,
  TProjectNode,
  TSopsInputType,
  TSopsProviderNode,
  TSopsTypeEnum,
} from '@/generated/graphql';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({

})
export default class SopsEdit extends Vue {
  @Prop() readonly project: TProjectNode | undefined

  @Prop() readonly sops: TSopsProviderNode | undefined

  @Prop({ default: false }) edit = false

  title = ''

  description: null | undefined | string = ''

  projectId = this?.project?.id || null

  secret1 = ''

  secret2 = ''

  secret3 = ''

  sopsType: Maybe<TSopsTypeEnum> = null

  currentSops: Maybe<TSopsProviderNode> = null

  sopsTypeChoices = [
    { text: 'AWS KMS', value: TSopsTypeEnum.Aws },
    { text: 'PGP', value: TSopsTypeEnum.Pgp },
  ]

  showForm = false;

  get headlinePrefix(): TranslateResult {
    return this.edit ? this.$t('Edit') : this.$t('Add');
  }

  get secret1Label(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('Access Key'),
    );
    map.set(
      'pgp', this.$t('Key'),
    );
    return map.get(this.sopsType);
  }

  get secret1Placeholder(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('Enter Access Key'),
    );
    map.set(
      'pgp', this.$t('Enter Key'),
    );
    return map.get(this.sopsType);
  }

  get secret2Label(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('Secret Access Key'),
    );
    return map.get(this.sopsType);
  }

  get secret2Placeholder(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('Enter Secret Access Key'),
    );
    return map.get(this.sopsType);
  }

  submit(): void {
    if (!this.sopsType) {
      return;
    }
    const variables: TCreateUpdateSopsMutationVariables = {
      title: this.title,
      description: this.description,
      project: this?.project?.id,
      sopsType: this.sopsType,
    };
    if (this.edit && this.currentSops) {
      variables.id = this.currentSops.id;
    }
    if (this.secret1 !== 'True') {
      variables.secret1 = this.secret1;
    }
    if (this.secret2 && this.secret2 !== 'True') {
      variables.secret2 = this.secret2;
    }
    this.$apollo.mutate({
      mutation: CreateUpdateSops,
      variables,
    })
      .then((data) => {
        console.log(data);
        if (data.data.createUpdateSops.ok) {
          this.resetValues();
          this.handleShowForm(false);
        }
        console.log(this.$apollo.queries);
        this.$parent.$emit('sops-created');
      })
      .catch((err) => console.log(err));
  }

  handleShowForm(show: boolean): void {
    this.showForm = show;
    if (!show) {
      this.resetValues();
    }
  }

  resetValues(): void {
    this.title = '';
    this.description = '';
    this.secret1 = '';
    this.secret2 = '';
    this.sopsType = null;
    this.currentSops = null;
  }

  handleSetEditSops(sops: TSopsProviderNode): void {
    this.showForm = true;
    this.title = sops.title;
    this.description = sops.description;
    this.edit = true;
    this.currentSops = sops;
    // eslint-disable-next-line no-underscore-dangle
    switch (sops.__typename) {
      case 'AWSKMSNode':
        this.sopsType = TSopsTypeEnum.Aws;
        this.secret1 = sops.accessKey;
        this.secret2 = sops.secretAccessKey;
        break;
      case 'PGPKeyNode':
        this.sopsType = TSopsTypeEnum.Pgp;
        this.secret1 = sops.privateKey;
        break;
      default:
        this.sopsType = null;
    }
  }
}
</script>

<style scoped lang="scss">
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
</style>
