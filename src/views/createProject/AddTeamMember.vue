<template>
<div>

  <div>
    <h1>Add Team Member to {{ project.title }}</h1>
  </div>
  <v-form class="white">

    <v-text-field
                :label="$t('Email Address')"
                name="login"
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
    ></v-select>
  </v-form>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TProjectNode, TProjectNodePage } from '@/generated/graphql';
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
    const otherProjects = [];
    this.otherProjects.map((x: TProjectNode) => otherProjects.push(x.title));
    return otherProjects;
  }

  set initialProjectChoice(title: string) {
    this.projectChoice = title;
  }
}
</script>

<style scoped>

</style>
