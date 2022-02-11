<template>
  <div>
    <error-handler></error-handler>
    <app-navigation></app-navigation>
    <app-bar></app-bar>
    <v-main>
      <v-container fluid class="px-8">
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navigation from '@/components/Navigation.vue';
import AppBar from '@/components/AppBar.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

export default defineComponent({
  name: 'UnikubeLayout',
  components: {
    AppNavigation: Navigation,
    AppBar,
    ErrorHandler,
  },
});
</script>

<style scoped>
</style>
