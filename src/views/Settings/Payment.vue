<template>
  <div class="py-5">
    <h2>{{ $t('settings.payment.title') }}</h2>
    <p>{{ $t('settings.payment.intro') }}</p>
    <v-divider></v-divider>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Payment extends Vue {
}
</script>

<style scoped>

</style>
