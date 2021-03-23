<template>
  <v-container>
    <h3>Sops</h3>
    <div v-if="project.sops && project.sops.length">
    <v-card
        v-for="sops in project.sops"
        v-bind:key="sops.title"
        tile
      >
      <v-list max-width="800" class="sops-list">
        <v-list-item two-line>
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
                  <v-icon size="24">
                    $vuetify.icons.edit
                  </v-icon>
                  Edit Sops
                </v-btn>
            </v-list-item-title>
            <v-list-item-subtitle> {{ sops.description }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-card>
    </div>
    <v-btn
      v-if="!showForm"
      large
      color="primary"
      @click="handleShowForm(true)"
    >Add Sops</v-btn>
    <v-form class="pa-10 white create-form" v-if="showForm">
      <v-row>
      <v-col>
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
  </v-container>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import { CreateUpdateSops, TProjectNode, TSopsProviderNode } from '@/generated/graphql';

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

  sopsType = ''

  sopsTypeChoices = [
    { text: 'AWS KMS', value: 'aws' },
    { text: 'PGP', value: 'pgp' },
  ]

  showForm = false;

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
    this.$apollo.mutate({
      mutation: CreateUpdateSops,
      variables: {
        title: this.title,
        description: this.description,
        project: this?.project?.id,
        secret1: this.secret1,
        secret2: this.secret2 ? this.secret2 : null,
        sopsType: this.sopsType,
      },
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
    this.sopsType = '';
  }

  handleSetEditSops(sops: {[key: string]: string}): void {
    this.showForm = true;
    this.title = sops.title;
    this.description = sops.description;
    // eslint-disable-next-line no-underscore-dangle
    switch (sops.__typename) {
      case 'AWSKMSNode':
        this.sopsType = 'aws';
        break;
      case 'PGPKeyNode':
        this.sopsType = 'pgp';
        break;
      default:
        this.sopsType = '';
    }
  }
}
</script>

<style scoped lang="scss">
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
</style>
