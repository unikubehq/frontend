<template>
  <v-container fluid>
    <v-form>
      <v-row>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.name')"
            name="projectName"
            filled
            variant="outlined"
            type="text"
            :error-messages="titleErrors"
            :placeholder="$t('projects.enterName')"
            v-model="title"
            @blur="$v.title.$touch()"
            prepend-inner-icon="$vuetify.icons.projectInput"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.description')"
            name="description"
            filled
            variant="outlined"
            type="text"
            :placeholder="$t('projects.enterDescription')"
            v-model="description"
            prepend-inner-icon="$vuetify.icons.description"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.specificationRepository')"
            name="specRepo"
            filled
            variant="outlined"
            type="text"
            :placeholder="$t('projects.enterSpecificationRepository')"
            v-model="specRepository"
            :error-messages="specRepositoryErrors"
            prepend-inner-icon="$vuetify.icons.repository"
            @blur="$v.specRepository.$touch()"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.specificationRepositoryBranch')"
            name="specRepoBranch"
            filled
            variant="outlined"
            type="text"
            :placeholder="$t('projects.enterSpecificationRepositoryBranch')"
            v-model="specRepositoryBranch"
            :error-messages="specRepositoryBranchErrors"
            prepend-inner-icon="$vuetify.icons.branch"
            @blur="$v.specRepositoryBranch.$touch()"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.accessUsername')"
            name="accessUsername"
            :hint="$t('projects.accessUsernameHint')"
            autocomplete="off"
            filled
            variant="outlined"
            type="text"
            :placeholder="$t('projects.enterAccessUsername')"
            v-model="accessUsername"
            :error-messages="accessUsernameErrors"
            prepend-inner-icon="$vuetify.icons.accessUser"
            @change="$v.accessUsername.$touch()"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.accessToken')"
            name="accessToken"
            filled
            variant="outlined"
            type="password"
            :placeholder="$t('projects.enterAccessToken')"
            v-model="accessToken"
            :error-messages="accessTokenErrors"
            prepend-inner-icon="$vuetify.icons.accessToken"
            @change="$v.accessToken.$touch()"
            persistent-placeholder
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-select
            :label="$t('projects.specificationType')"
            name="specType"
            filled
            variant="outlined"
            type="text"
            :placeholder="$t('projects.enterSpecificationType')"
            v-model="specType"
            :items="specTypeChoices"
            persistent-placeholder
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-alert
            dense
            variant="outlined"
            icon="$vuetify.icons.warning"
            type="error"
            v-if="submissionError">
            {{ submissionError }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="9">
          <a
            class="link--secondary"
            @click="$router.go(-1)"
            @keydown.space="$router.go(-1)"
            v-if="editMode"
          >
            <v-icon
                style="transform: rotate(180deg)"
                class="mr-1"
                small
            >
              $vuetify.icons.arrowRightGrey
            </v-icon>{{ $t('general.goBack') }}</a>
        </v-col>
        <v-col cols="3">
          <v-btn
          block
          size="large"
          color="primary"
          :loading="saveLoading"
          @click="submit"
          :disabled="disableButton"
          class="projectForm__submit"
        >
            {{ submitButtonText }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <v-divider class="mt-10 mb-10" />
  </v-container>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { required, url } from '@vuelidate/validators';
import VueI18n from 'vue-i18n';
import { ApolloError, FetchResult } from '@apollo/client';
import {
  CreateProject,
  TCreateProjectMutationResult,
  TCreateProjectMutationVariables,
  TProjectNode,
  TSpecicifactionTypeEnum,
  TUpdateProjectMutationVariables,
  UpdateProject,
} from '@/generated/graphql';
import useVuelidate from '@vuelidate/core';
import getErrorMessage from '@/utils/validations';
import useAuthStore from '@/stores/auth';
import TranslateResult = VueI18n.TranslateResult;

export default defineComponent({
  setup() {
    const title = ref('');
    const specRepository = ref('');
    const specRepositoryBranch = ref('');
    const accessUsername = ref('');
    const accessToken = ref('');
    const rules = computed(() => ({
      title: {
        required,
      },
      specRepository: {
        required,
        url,
      },
      specRepositoryBranch: {
        required,
      },
      accessUsername: {
      },
      accessToken: {
      },
    }));
    const v = useVuelidate(rules, {
      title,
      specRepository,
      specRepositoryBranch,
      accessUsername,
      accessToken,
    });
    const auth = useAuthStore();
    return {
      auth,
      $v: v,
      title,
      specRepository,
      specRepositoryBranch,
      accessUsername,
      accessToken,
    };
  },
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    project: {
      type: Object as PropType<TProjectNode>,
      required: false,
    },
  },
  data() {
    return {
      description: '',
      submissionError: '',
      specType: TSpecicifactionTypeEnum.Helm,
      repoDir: '',
      id: '',
      specTypeChoices: Object.values(TSpecicifactionTypeEnum),
      saveLoading: false,
    };
  },
  computed: {
    titleErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.title.$errors);
    },
    specRepositoryErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.specRepository.$errors);
    },
    specRepositoryBranchErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.specRepositoryBranch.$errors);
    },
    accessUsernameErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.accessUsername.$errors);
    },
    accessTokenErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.accessToken.$errors);
    },
    disableButton(): boolean {
      return this.$v.$invalid;
    },
    submitButtonText(): TranslateResult {
      return this.editMode ? this.$t('general.save').toString() : this.$t('general.next').toString();
    },
  },
  methods: {
    handleEditMode(): void {
      if (this.project) {
        this.title = this.project.title;
        this.description = this.project.description || '';
        this.specRepository = this.project.specRepository;
        this.specRepositoryBranch = this.project.specRepositoryBranch || '';
        this.specType = this.project.specType.toLowerCase() as TSpecicifactionTypeEnum;
        this.accessUsername = this.project.accessUsername;
        this.accessToken = this.project.accessUsername;
        this.id = this.project.id;
      }
    },
    success(data: FetchResult<TCreateProjectMutationResult>): void {
      this.saveLoading = false;
      this.auth.refresh(-1).then((refreshed: boolean) => {
        if (data.data?.createUpdateProject?.project && refreshed) {
          if (this.editMode) {
            this.$router.go(-1);
          } else {
            this.$router.push({ name: 'project.addMembers', params: { slug: data.data.createUpdateProject.project.id } });
          }
        } else {
          console.log('Something went wrong creating the project or refreshing the rpt.');
        }
      });
    },
    failed(err: ApolloError): void {
      this.saveLoading = false;
      this.submissionError = err.message;
    },
    submit(): void {
      this.saveLoading = true;
      const projectVariables: TCreateProjectMutationVariables = {
        title: this.title,
        description: this.description,
        specRepository: this.specRepository,
        specType: this.specType,
        specRepositoryBranch: this.specRepositoryBranch,
        organization: this.$store.state.context.organization.id,
        accessToken: null,
        accessUsername: null,
      };
      if (this.$v.accessUsername.$dirty) {
        projectVariables.accessUsername = this.accessUsername;
      } else if (!projectVariables.accessToken) {
        delete projectVariables.accessToken;
      }
      if (this.$v.accessToken.$dirty) {
        projectVariables.accessToken = this.accessToken;
      } else if (!projectVariables.accessUsername) {
        delete projectVariables.accessUsername;
      }
      if (!this.editMode) {
        const variables: TCreateProjectMutationVariables = projectVariables;
        this.$apollo.mutate({
          mutation: CreateProject,
          variables,
        })
          .then(this.success)
          .catch(this.failed);
      } else {
        const variables: TUpdateProjectMutationVariables = { ...projectVariables, id: this.id };
        this.$apollo.mutate({
          mutation: UpdateProject,
          variables,
        })
          .then(this.success)
          .catch(this.failed);
      }
    },
  },
  mounted(): void {
    if (this.editMode) {
      this.handleEditMode();
    }
  },
  watch: {
    project() {
      this.handleEditMode();
    },
  },
});
</script>

<style>
</style>
