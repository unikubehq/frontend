<template>
  <div class="py-9">
    <h2 class="text--semi-bold">{{ t('projects.enterDetailsBelow') }}</h2>
    <v-card class="pa-5" elevation="2">
      <project-form :project="project" :edit-mode="false"></project-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TProjectNode } from '@/generated/graphql';
import ProjectForm from '@/views/Projects/ProjectForm.vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  components: {
    ProjectForm,
  },
  props: {
    project: {
      required: false,
      type: Object as PropType<TProjectNode> | undefined,
    },
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    return {
      t,
    };
  },
});
</script>

<style>
</style>
