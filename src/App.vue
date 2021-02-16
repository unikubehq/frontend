<template>
  <v-app>
    <router-view>
    </router-view>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="#CEFFE9"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { getModule } from 'vuex-module-decorators';
import UI from '@/store/modules/ui';

export default Vue.extend({
  name: 'App',
  computed: {
    overlay() {
      const ui = getModule(UI, this.$store);
      return ui.overlay;
    },
  },
});
</script>

<style lang="scss">
@import "styles/main";

</style>
