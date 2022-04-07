<template>
    <v-alert
    variant="outlined"
    color="error"
    >
    <h2>{{ t('settings.dangerZone') }}</h2>
    <slot></slot>
   </v-alert>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    return {
      t,
    };
  },
});
</script>
