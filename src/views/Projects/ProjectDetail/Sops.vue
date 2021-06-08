<template>
  <div>
    <h3 style="font-weight: 500;">{{ $t('sops.manageSops') }}</h3>
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
                  color="#a1a9b2"
                  width="144"
                  right
                  absolute
                  @click="handleSetEditSops(sops)"
                >
                  <v-icon size="24" class="mr-2">
                    $vuetify.icons.edit
                  </v-icon>{{ $t('sops.editSops') }}</v-btn>
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
      class="mt-5"
      @click="handleShowForm(true)"
    >{{ $t('sops.addSops') }}</v-btn>
    <v-row>
      <v-col cols="6">
        <v-form class="py-4 white create-form" v-if="showForm">
          <v-row>
          <v-col>
            <h3>{{ headlinePrefix }} SOPS: {{ title }}</h3>
            <v-divider class="mb-6"></v-divider>
              <v-select
                :label="$t('sops.type')"
                name="specType"
                filled
                outlined
                type="text"
                :placeholder="$t('sops.enterType')"
                v-model="sopsType"
                :items="sopsTypeChoices"
                persistent-placeholder
              />
          <v-text-field
                :label="$t('sops.title')"
                name="sopsName"
                filled
                outlined
                type="text"
                :placeholder="$t('sops.enterTitle')"
                v-model="title"
                :error-messages="titleErrors"
                @blur="$v.title.$touch()"
                prepend-inner-icon="$vuetify.icons.projectInput"
              persistent-placeholder
              />
          <v-text-field
                :label="$t('sops.description')"
                name="description"
                filled
                outlined
                type="text"
                :placeholder="$t('sops.enterDescription')"
                v-model="description"
                prepend-inner-icon="$vuetify.icons.description"
              persistent-placeholder
              />
            <v-textarea
                v-if="sopsType === 'pgp'"
                :label="secret1Label"
                name="secret1"
                filled
                outlined
                type="password"
                no-resize
                :placeholder="secret1Placeholder"
                v-model="secret1"
                :error-messages="secret1Errors"
                @blur="$v.secret1.$touch()"
                class="textarea-password"
                :class="{'textarea__hover-active': pgpHover}"
                @dragover="dragover"
                @dragleave="dragleave"
                @drop="drop"
                prepend-inner-icon="$vuetify.icons.accessToken"
                persistent-placeholder
            ></v-textarea>
          <v-text-field
              v-if="sopsType === 'aws'"
                :label="secret1Label"
                name="secret1"
                filled
                outlined
                type="password"
                :placeholder="secret1Placeholder"
                @blur="$v.secret1.$touch()"
                :error-messages="secret1Errors"
                v-model="secret1"
                prepend-inner-icon="$vuetify.icons.accessToken"
              persistent-placeholder
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
                :error-messages="secret2Errors"
                @blur="$v.secret2.$touch()"
                prepend-inner-icon="$vuetify.icons.accessToken"
                persistent-placeholder
              />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="8">
              <v-btn
                class="float-right mt-1 link--secondary"
                color="white"
                tag="a"
                :ripple="false"
                elevation="0"
                @click="handleShowForm(false)"
              >{{ $t('general.cancel') }}</v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
              large
              block
              :ripple="false"
              color="primary"
              @click="submit"
              :disabled="$v.$invalid"
            >{{ $t('general.save') }}</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import {
  CreateUpdateSops,
  Maybe, TCreateUpdateSopsMutationVariables,
  TProjectNode,
  TSopsProviderNode,
  TSopsTypeEnum,
} from '@/generated/graphql';
import VueI18n from 'vue-i18n';
import {
  required, requiredIf, ValidationFunc, ValidationRule,
} from 'vuelidate/lib/validators';
import { validationMixin } from '@/components/mixins';
import TranslateResult = VueI18n.TranslateResult;

@Component
export default class Sops extends validationMixin {
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

  pgpHover = false

  validations(): {[key: string]: {[key: string]: ValidationRule | ValidationFunc}} {
    return {
      title: {
        required,
      },
      secret1: {
        required,
      },
      secret2: {
        required: requiredIf((): boolean => this.sopsType === TSopsTypeEnum.Aws),
      },
    };
  }

  get headlinePrefix(): TranslateResult {
    return this.edit ? this.$t('general.edit').toString() : this.$t('general.add').toString();
  }

  get secret1Label(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('sops.accessKey').toString(),
    );
    map.set(
      'pgp', this.$t('sops.pgpKey').toString(),
    );
    return map.get(this.sopsType);
  }

  get secret1Placeholder(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('sops.enterAccessKey').toString(),
    );
    map.set(
      'pgp', this.$t('sops.enterPgpKey').toString(),
    );
    return map.get(this.sopsType);
  }

  get secret2Label(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('sops.secretAccessKey').toString(),
    );
    return map.get(this.sopsType);
  }

  get secret2Placeholder(): string {
    const map = new Map();
    map.set(
      'aws', this.$t('sops.enterSecretAccessKey').toString(),
    );
    return map.get(this.sopsType);
  }

  get titleErrors(): TranslateResult[] {
    return this.handleErrors('title');
  }

  get secret1Errors(): TranslateResult[] {
    return this.handleErrors('secret1');
  }

  get secret2Errors(): TranslateResult[] {
    return this.handleErrors('secret2');
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
        if (data.data.createUpdateSops.ok) {
          this.resetValues();
          this.handleShowForm(false);
        }
        this.$parent.$emit('sops-created');
      })
      .catch((err) => {
        this.$store.commit({
          type: 'errors/setError',
          error: err,
          message: 'Something went wrong.',
          location: 'SopsEdit',
        });
      });
  }

  dragover(event: { currentTarget: HTMLInputElement, preventDefault: () => void }): void {
    event.preventDefault();
    // Add some visual fluff to show the user can drop its files
    this.pgpHover = true;
  }

  dragleave(): void {
    // Clean up
    this.pgpHover = false;
  }

  drop(event: {
    currentTarget: HTMLInputElement,
    preventDefault: () => void,
    dataTransfer: DataTransfer
  }): void {
    event.preventDefault();
    this.pgpHover = false;
    const file = event.dataTransfer.files[0];
    const reader = new FileReader();
    // eslint-disable-next-line
    reader.addEventListener('load', (readerEvent: any) => {
      this.secret1 = readerEvent.target.result;
    });
    reader.readAsText(file);
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
::v-deep .textarea__hover-active .v-input__slot {
  background-color: $green-light-6 !important;
}
</style>
