<template>
    <v-alert
    outlined
    color="error"
    >
    <h2>{{ $t('settings.dangerZone') }}</h2>
    <slot></slot>
   </v-alert>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class DangerZone extends Vue {
}
</script>
