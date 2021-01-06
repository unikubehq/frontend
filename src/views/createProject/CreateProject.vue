<template>
  <v-container>
    <h2 v-if="editMode">Edit Project</h2>
    <h2 v-else>Enter Your Project Details Below</h2>
    <v-form class="pa-10 white create-form">
      <v-row>
        <v-col>
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
            prepend-inner-icon="$vuetify.icons.user"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('Description')"
            name="description"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Description')"
            v-model="description"
            prepend-inner-icon="$vuetify.icons.user"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('Repository Directory')"
            name="repoDirectory"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Repository Directory')"
            v-model="repoDir"
            prepend-inner-icon="$vuetify.icons.user"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('Specification Repository')"
            name="specRepo"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Specification Repository')"
            v-model="specRepository"
            :error-messages="specRepositoryErrors"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.specRepository.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('Specification Repository Branch')"
            name="specRepoBranch"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Repository Branch')"
            v-model="specRepositoryBranch"
            :error-messages="specRepositoryBranchErrors"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.specRepositoryBranch.$touch()"
          />
        </v-col>
        <v-col>
          <v-select
            :label="$t('Specification Type')"
            name="specType"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Specification Type')"
            v-model="specType"
            :items="specTypeChoices"
            prepend-inner-icon="$vuetify.icons.user"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('Access Username')"
            name="accessUsername"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Access Username')"
            v-model="accessUsername"
            :error-messages="accessUsernameErrors"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.accessUsername.$touch()"
          />
        </v-col>
        <v-col>
          <v-text-field
            :label="$t('Access Token')"
            name="accessToken"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Access Token')"
            v-model="accessToken"
            :error-messages="accessTokenErrors"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.accessToken.$touch()"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          large
          color="primary"
          @click="submit"
          :disabled="disableButton"
        >Next</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CreateProject, UpdateProject, TProjectNode } from '@/generated/graphql';
import { required, url } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
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
      required,
    },
    accessToken: {
      required,
    },
  },
})
export default class CreateProjectView extends Vue {
  @Prop() readonly editMode: boolean | undefined

  @Prop() readonly project: TProjectNode | undefined

  title = '';

  description = '';

  specRepository = '';

  specRepositoryBranch = 'master';

  specType = 'plain';

  accessUsername = '';

  accessToken = '';

  repoDir = '';

  id = '';

  specTypeChoices = ['plain', 'helm']

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

  handleEditMode(): void {
    if (this.project) {
      this.title = this.project.title;
      this.description = this.project.description;
      this.repoDir = this.project.repoDir;
      this.specRepository = this.project.specRepository;
      this.specRepositoryBranch = this.project.specRepositoryBranch;
      this.specType = this.project.specType;
      this.accessUsername = this.project.accessUsername;
      this.accessToken = this.project.accessUsername;
      this.id = this.project.id;
    }
  }

  mounted(): void {
    if (this.editMode) {
      this.handleEditMode();
      this.$nextTick(() => {
        this.handleEditMode();
      });
    }
  }

  submit(): void {
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
        id: this.id,
      },
    })
      .then((data) => {
        console.log(data.data);
        if (data.data.createUpdateProject.project) {
          if (this.editMode) {
            this.$router.go(-1);
          } else this.$router.push('create-project/add-members');
        }
      })
      .catch((err) => console.log(err));
  }
}
</script>

<style scoped>
.create-form {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
}
</style>
