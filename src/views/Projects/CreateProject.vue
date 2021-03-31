<template>
  <v-container class="pa-10">
    <h2 class="text--semi-bold">Enter Your Project Details Below</h2>
    <v-card class="pa-5">
      <project-form :project="project"></project-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import { TProjectNode } from '@/generated/graphql';
import ProjectForm from '@/views/Projects/ProjectForm.vue';

@Component({
  components: {
    ProjectForm,
  },
})
export default class CreateProjectView extends Vue {
  @Prop() readonly project: TProjectNode | undefined
}
</script>

<style>
</style>
