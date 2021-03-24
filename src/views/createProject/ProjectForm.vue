<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Project Name')"
            name="projectName"
            filled
            outlined
            type="text"
            :error-messages="titleErrors"
            :placeholder="$t('Enter Project Name')"
            v-model="title"
            @blur="$v.title.$touch()"
            prepend-inner-icon="$vuetify.icons.projectInput"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Description')"
            name="description"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Description')"
            v-model="description"
            prepend-inner-icon="$vuetify.icons.description"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Specification Repository')"
            name="specRepo"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Specification Repository')"
            v-model="specRepository"
            :error-messages="specRepositoryErrors"
            prepend-inner-icon="$vuetify.icons.repository"
            @blur="$v.specRepository.$touch()"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Specification Repository Branch')"
            name="specRepoBranch"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Repository Branch')"
            v-model="specRepositoryBranch"
            :error-messages="specRepositoryBranchErrors"
            prepend-inner-icon="$vuetify.icons.branch"
            @blur="$v.specRepositoryBranch.$touch()"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Access Username')"
            name="accessUsername"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Access Username')"
            v-model="accessUsername"
            :error-messages="accessUsernameErrors"
            prepend-inner-icon="$vuetify.icons.accessUser"
            @blur="$v.accessUsername.$touch()"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            :label="$t('Access Token')"
            name="accessToken"
            filled
            outlined
            type="password"
            :placeholder="$t('Enter Access Token')"
            v-model="accessToken"
            :error-messages="accessTokenErrors"
            prepend-inner-icon="$vuetify.icons.accessToken"
            @blur="$v.accessToken.$touch()"
          />
        </v-col>
        <v-col cols="6" class="py-0">
          <v-select
            :label="$t('Specification Type')"
            name="specType"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Specification Type')"
            v-model="specType"
            :items="specTypeChoices"
          />
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
            </v-icon>
            Go Back
          </a>
        </v-col>
        <v-col cols="3">
          <v-btn
          block
          large
          color="primary"
          :loading="saveLoading"
          @click="submit"
          :disabled="disableButton || saveLoading"
        >
            {{ submitButtonText }}
            <template v-slot:loader>
              <span>Saving...</span>
            </template>
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
    <sops-edit :project="project"></sops-edit>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import { CreateProject, UpdateProject, TProjectNode } from '@/generated/graphql';
import { required, url } from 'vuelidate/lib/validators';
import SopsEdit from '@/views/projectDetail/SopsEdit.vue';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  components: {
    SopsEdit,
  },
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
      required,
    },
    accessToken: {
      required,
    },
  },
})
export default class ProjectForm extends Vue {
  @Prop() readonly editMode: boolean | undefined

  @Prop() readonly project: TProjectNode | undefined

  title = '';

  description: string | null | undefined = '';

  specRepository = '';

  specRepositoryBranch: string | null | undefined = 'master';

  specType = 'plain';

  accessUsername = '';

  accessToken = '';

  repoDir = '';

  id = '';

  specTypeChoices = ['plain', 'helm']

  saveLoading = false

  get titleErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.title.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.title.$dirty ? errors : [];
  }

  get specRepositoryErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.specRepository.required) {
      errors.push(this.$t('requiredError'));
    }
    if (!this.$v.specRepository.url) {
      errors.push('Please enter a valid url.');
    }
    return this.$v.specRepository.$dirty ? errors : [];
  }

  get specRepositoryBranchErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.specRepositoryBranch.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.specRepositoryBranch.$dirty ? errors : [];
  }

  get accessUsernameErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.accessUsername.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.accessUsername.$dirty ? errors : [];
  }

  get accessTokenErrors(): TranslateResult[] {
    const errors = [];
    if (!this.$v.accessToken.required) {
      errors.push(this.$t('requiredError'));
    }
    return this.$v.accessToken.$dirty ? errors : [];
  }

  get disableButton(): boolean {
    return this.$v.$invalid;
  }

  get submitButtonText(): TranslateResult {
    return this.editMode ? this.$t('Save') : this.$t('Next');
  }

  handleEditMode(): void {
    if (this.project) {
      this.title = this.project.title;
      this.description = this.project.description;
      this.specRepository = this.project.specRepository;
      this.specRepositoryBranch = this.project.specRepositoryBranch;
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

  submit(): void {
    this.saveLoading = true;
    this.$apollo.mutate({
      mutation: this.editMode ? UpdateProject : CreateProject,
      variables: {
        title: this.title,
        description: this.description,
        specRepository: this.specRepository,
        specType: this.specType,
        accessUsername: this.accessUsername,
        accessToken: this.accessToken,
        specRepositoryBranch: this.specRepositoryBranch,
        organization: this.$store.state.context.organization.id,
        id: this.id,
      },
    })
      .then((data) => {
        console.log(data.data);
        this.saveLoading = false;
        if (data.data.createUpdateProject.project) {
          if (this.editMode) {
            this.$router.go(-1);
          } else this.$router.push('create-project/add-members');
        }
      })
      .catch((err) => {
        this.saveLoading = false;
        console.log(err);
      });
  }
}
</script>

<style>
</style>
