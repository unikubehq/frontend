<template>
  <div class="py-9">
    <h2 class="text--semi-bold">{{ $t('projects.enterDetailsBelow') }}</h2>
    <v-card class="pa-5">
      <project-form :project="project" :edit-mode="false"></project-form>
    </v-card>
  </div>
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
