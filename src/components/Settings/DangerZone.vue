<template>
    <v-alert
    variant="outlined"
    color="error"
    >
    <h2>{{ $t('settings.dangerZone') }}</h2>
    <slot></slot>
   </v-alert>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
});
</script>
