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
import Vue from 'vue';
import Component from 'vue-class-component';
import Navigation from '@/components/Navigation.vue';
import AppBar from '@/components/AppBar.vue';
import ErrorHandler from '@/components/ErrorHandler.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

@Component({
  components: {
    AppNavigation: Navigation,
    AppBar,
    ErrorHandler,
  },
})
export default class Layout extends Vue {
}
</script>

<style scoped>
</style>
