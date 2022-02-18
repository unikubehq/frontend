<template>
  <div>
    <div v-if="project.sops && project.sops.length">
      <v-row>
      <v-col cols="6" v-for="sops in project.sops" :key="sops.id">
        <v-card outlined>
          <v-card-title>
            <v-row>
              <v-col cols="9">
                <v-icon>$vuetify.icons.accessToken</v-icon>
                {{ sops.title }}
              </v-col>
              <v-col cols="3" class="text-right">
                <v-btn
                  outlined
                  width="50"
                  :ripple="false"
                  @click="handleSetEditSops(sops)"
                >
                  <v-icon size="24">
                    $vuetify.icons.edit
                  </v-icon>
                </v-btn>
                <v-btn
                  outlined
                  width="50"
                  :ripple="false"
                  class="mt-3"
                  @click="deleteSopsDialog(sops)"
                >
                  <v-icon size="24">
                    $vuetify.icons.delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="mt-n3">
            {{ getSopsTypeString(sops.__typename) }}
            <span v-if="sops.description"> - {{ sops.description }}</span>
          </v-card-text>
        </v-card>
      </v-col>
      </v-row>
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
    <delete-sops :show="deleteDialog" :sops="deleteSops" @hide="deleteDialog = false;"
    @deleted="deleteDialog = false;$emit('update');"/>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import VueI18n from 'vue-i18n';
import {
  required, requiredIf,
} from '@vuelidate/validators';
import {
  CreateUpdateSops,
  Maybe, Scalars, TCreateUpdateSopsMutationVariables,
  TProjectNode,
  TSopsProviderNode,
  TSopsTypeEnum,
} from '@/generated/graphql';
import DeleteSops from '@/components/Projects/DeleteSops.vue';
import useVuelidate from '@vuelidate/core';
import getErrorMessage from '@/utils/validations';
import { ApolloError } from '@apollo/client';
import useErrorStore from '@/stores/errors';
import TranslateResult = VueI18n.TranslateResult;

export default defineComponent({
  name: 'SopsForm',
  setup() {
    const title = ref('');
    const secret1 = ref('');
    const secret2 = ref('');
    const sopsType = ref(null as Maybe<TSopsTypeEnum>);
    const rules = computed(() => ({
      title: {
        required,
      },
      secret1: {
        required,
      },
      secret2: {
        required: requiredIf((): boolean => sopsType.value === TSopsTypeEnum.Aws),
      },
    }));
    const v = useVuelidate(rules, {
      title,
      secret1,
      secret2,
    });

    const errorStore = useErrorStore();

    return {
      $v: v,
      errorStore,
      title,
      secret1,
      secret2,
      sopsType,
    };
  },
  components: {
    DeleteSops,
  },
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
      required: false,
    },
    sops: {
      type: Object as PropType<TSopsProviderNode>,
      required: false,
    },
  },
  data() {
    return {
      edit: false,
      description: '' as Maybe<string>,
      projectId: null as Maybe<Scalars['UUID']>,
      secret3: '',
      currentSops: null as Maybe<TSopsProviderNode>,
      sopsTypeChoices: [
        { text: 'AWS KMS', value: TSopsTypeEnum.Aws },
        { text: 'PGP', value: TSopsTypeEnum.Pgp },
      ],
      showForm: false,
      pgpHover: false,
      deleteDialog: false,
      deleteSops: null as TSopsProviderNode | null,
    };
  },
  computed: {
    headlinePrefix(): TranslateResult {
      return this.edit ? this.$t('general.edit').toString() : this.$t('general.add').toString();
    },
    secret1Label(): string {
      const map = new Map();
      map.set('aws', this.$t('sops.accessKey').toString());
      map.set('pgp', this.$t('sops.pgpKey').toString());
      return map.get(this.sopsType);
    },
    secret1Placeholder(): string {
      const map = new Map();
      map.set('aws', this.$t('sops.enterAccessKey').toString());
      map.set('pgp', this.$t('sops.enterPgpKey').toString());
      return map.get(this.sopsType);
    },
    secret2Label(): string {
      const map = new Map();
      map.set('aws', this.$t('sops.secretAccessKey').toString());
      return map.get(this.sopsType);
    },
    secret2Placeholder(): string {
      const map = new Map();
      map.set('aws', this.$t('sops.enterSecretAccessKey').toString());
      return map.get(this.sopsType);
    },
    titleErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.title.$errors);
    },
    secret1Errors(): TranslateResult[] {
      return getErrorMessage(this.$v.secret1.$errors);
    },
    secret2Errors(): TranslateResult[] {
      return getErrorMessage(this.$v.secret2.$errors);
    },
  },
  methods: {
    submit(): void {
      if (!this.sopsType) {
        return;
      }
      const variables: TCreateUpdateSopsMutationVariables = {
        title: this.title,
        description: this.description || '',
        project: this?.project?.id,
        sopsType: this.sopsType,
        id: null,
        secret1: null,
        secret2: null,
        secret3: null,
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
          this.$emit('update');
        })
        .catch((err: ApolloError) => {
          this.errorStore.setError({
            error: err,
            code: 200,
            location: 'SopsEdit',
          });
        });
    },
    dragover(event: { currentTarget: HTMLInputElement, preventDefault: () => void }): void {
      event.preventDefault();
      // Add some visual fluff to show the user can drop its files
      this.pgpHover = true;
    },
    dragleave(): void {
      // Clean up
      this.pgpHover = false;
    },
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
    },
    handleShowForm(show: boolean): void {
      this.showForm = show;
      if (!show) {
        this.resetValues();
      }
    },
    resetValues(): void {
      this.title = '';
      this.description = '';
      this.secret1 = '';
      this.secret2 = '';
      this.sopsType = null;
      this.currentSops = null;
    },
    handleSetEditSops(sops: TSopsProviderNode): void {
      this.showForm = true;
      this.title = sops.title;
      this.edit = true;
      this.description = sops.description;
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
    },
    deleteSopsDialog(sops: TSopsProviderNode): void {
      this.deleteSops = sops;
      this.deleteDialog = true;
    },
    // eslint-disable-next-line class-methods-use-this
    getSopsTypeString(typename: string): string {
      if (typename === 'AWSKMSNode') {
        return 'AWS KMS';
      }
      if (typename === 'PGPKeyNode') {
        return 'PGP';
      }
      return '';
    },
  },
  watch: {
    project: {
      deep: true,
      handler(value: TProjectNode): void {
        this.projectId = value.id;
      },
    },
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/_ci";
.sops-list-item {
  border-bottom: solid 1px rgb(161, 169, 178);
}
::v-deep .textarea__hover-active .v-input__slot {
  background-color: $green-light-6 !important;
}
</style>
