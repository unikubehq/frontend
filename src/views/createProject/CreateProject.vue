<template>
  <v-container>
    <h2>Enter Your Project Details Below</h2>
    <v-form class="pa-10 white create-form">
      <v-row>
        <v-col>
          <v-text-field
            :label="$t('Project Name')"
            name="projectName"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Project Name')"
            v-model="title"
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
            prepend-inner-icon="$vuetify.icons.user"
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
            prepend-inner-icon="$vuetify.icons.user"
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
            prepend-inner-icon="$vuetify.icons.user"
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
            prepend-inner-icon="$vuetify.icons.user"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-btn
          large
          color="primary"
          @click="submit"
        >Next</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { CreateProject } from '@/generated/graphql';

@Component()
export default class CreateProjectView extends Vue {
  title = '';

  description = '';

  specRepository = '';

  specRepositoryBranch = 'master';

  specType = 'plain';

  accessUsername = '';

  accessToken = '';

  repoDir = '';

  specTypeChoices = ['plain', 'helm']

  submit(): void {
    this.$apollo.mutate({
      mutation: CreateProject,
      variables: {
        title: this.title,
        description: this.description,
        specRepository: this.specRepository,
        specType: this.specType,
        accessUsername: this.accessUsername,
        accessToken: this.accessToken,
        specRepositoryBranch: this.specRepositoryBranch,
      },
    })
      .then((data) => {
        console.log(data.data);
        if (data.data.createUpdateProject.project) {
          this.$router.push('create-project/add-members');
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
