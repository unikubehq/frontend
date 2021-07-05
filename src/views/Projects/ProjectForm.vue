<template>
  <v-container fluid>
    <v-form>
      <v-row>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('projects.name')"
            name="projectName"
            filled
            outlined
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
            outlined
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
            outlined
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
            outlined
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
            filled
            outlined
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
            outlined
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
            outlined
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
            outlined
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
          large
          color="primary"
          :loading="saveLoading"
          @click="submit"
          :disabled="disableButton"
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
  Component, Prop, Watch,
} from 'vue-property-decorator';
import {
  CreateProject,
  UpdateProject,
  TProjectNode,
  TCreateProjectMutationResult,
  TCreateProjectMutationVariables, TUpdateProjectMutationVariables,
} from '@/generated/graphql';
import { required, url } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import { validationMixin } from '@/components/mixins';
import { ApolloError } from '@apollo/client';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
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
  },
})
export default class ProjectForm extends validationMixin {
  @Prop() readonly editMode: boolean | undefined

  @Prop() readonly project: TProjectNode | undefined

  title = '';

  description = '';

  specRepository = '';

  submissionError = '';

  specRepositoryBranch = 'master';

  specType = 'helm';

  accessUsername = '';

  accessToken = '';

  repoDir = '';

  id = '';

  specTypeChoices = ['helm']

  saveLoading = false

  get titleErrors(): TranslateResult[] {
    return this.handleErrors('title');
  }

  get specRepositoryErrors(): TranslateResult[] {
    return this.handleErrors('specRepository');
  }

  get specRepositoryBranchErrors(): TranslateResult[] {
    return this.handleErrors('specRepositoryBranch');
  }

  get accessUsernameErrors(): TranslateResult[] {
    return this.handleErrors('accessUsername');
  }

  get accessTokenErrors(): TranslateResult[] {
    return this.handleErrors('accessToken');
  }

  get disableButton(): boolean {
    return this.$v.$invalid;
  }

  get submitButtonText(): TranslateResult {
    return this.editMode ? this.$t('general.save').toString() : this.$t('general.next').toString();
  }

  handleEditMode(): void {
    if (this.project) {
      this.title = this.project.title;
      this.description = this.project.description || '';
      this.specRepository = this.project.specRepository;
      this.specRepositoryBranch = this.project.specRepositoryBranch || '';
      this.specType = this.project.specType.toLowerCase();
      this.accessUsername = this.project.accessUsername;
      this.accessToken = this.project.accessUsername;
      this.id = this.project.id;
    }
  }

  @Watch('project')
  handleProjectChange(): void {
    this.handleEditMode();
  }

  mounted(): void {
    if (this.editMode) {
      this.handleEditMode();
    }
  }

  success(data: {data: TCreateProjectMutationResult}): void {
    this.saveLoading = false;
    this.$store.dispatch('auth/refresh', -1).then((refreshed: boolean) => {
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
  }

  failed(err: ApolloError): void {
    this.saveLoading = false;
    this.submissionError = err.message;
  }

  submit(): void {
    this.saveLoading = true;
    const projectVariables: TCreateProjectMutationVariables = {
      title: this.title,
      description: this.description,
      specRepository: this.specRepository,
      specType: this.specType,
      specRepositoryBranch: this.specRepositoryBranch,
      organization: this.$store.state.context.organization.id,
    };
    if (this.$v.accessUsername.$dirty) {
      projectVariables.accessUsername = this.accessUsername;
    }
    if (this.$v.accessToken.$dirty) {
      projectVariables.accessToken = this.accessToken;
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
      const variables: TUpdateProjectMutationVariables = projectVariables;
      variables.id = this.id;
      this.$apollo.mutate({
        mutation: UpdateProject,
        variables,
      })
        .then(this.success)
        .catch(this.failed);
    }
  }
}
</script>

<style>
</style>
