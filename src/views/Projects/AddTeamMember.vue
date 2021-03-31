<template>
  <div>
<v-container class="pl-12 text--white" style="background-color: #252e65">
  <h1 class="text-h1 mt-5" style="color: white;">Add Team Member</h1>
</v-container>
    <v-container class="px-12">
      <v-form class="white">

        <v-text-field
          :label="$t('Email Address')"
          name="email"
          filled
          outlined
          type="text"
          :placeholder="$t('Enter Email Address')"
          v-model="email"
          :error-messages="emailErrors"
          prepend-inner-icon="$vuetify.icons.email"
          @blur="$v.email.$touch()"
        />
        <v-select
          :items="projectChoices"
          v-model="projectChoice"
          outlined
          label="Project"
          prepend-inner-icon="$vuetify.icons.organization"
        ></v-select>
        <v-select
          label="Access to"
          :items="applicationChoices"
          outlined
          prepend-inner-icon="$vuetify.icons.organization"
          placeholder="Select Applications"
          multiple
        ></v-select>
        <v-select
          label="Role"
          :items="['Admin', 'Member']"
          outlined
          prepend-inner-icon="$vuetify.icons.organization"
          placeholder="Select Role"
        ></v-select>
        <v-divider class="mb-3"></v-divider>
        <v-btn
          color="primary"
          right
          absolute
          class="mr-8"
          large
          width="204px"
          height="48px"
          @click="$emit('done')"
        >Add Member</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TPackageNode, TProjectNode, TProjectNodePage } from '@/generated/graphql';
import { email } from 'vuelidate/lib/validators';

@Component({
  validations: {
    email,
  },
})
export default class AddTeamMember extends Vue {
  @Prop() readonly project: TProjectNode | undefined

  @Prop() readonly otherProjects: TProjectNodePage | undefined

  email = '';

  projectChoice = this.project?.title;

  get projectChoices(): Array<string> {
    const otherProjects: Array<string> = [];
    this.otherProjects?.results?.forEach((x: TProjectNode | null) => {
      if (x) {
        otherProjects.push(x.title);
      }
    });
    return otherProjects;
  }

  get applicationChoices(): Array<string> {
    const applications: Array<string> = [];
    this.project?.packages.map((x: TPackageNode) => applications.push(x.title));
    return applications;
  }

  set initialProjectChoice(title: string) {
    this.projectChoice = title;
  }
}
</script>

<style scoped>
</style>
