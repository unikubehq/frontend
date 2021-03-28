<template>
  <div>
    <app-navigation></app-navigation>
    <app-bar></app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Navigation from '@/components/Navigation.vue';
import AppBar from '@/components/AppBar.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

@Component({
  components: {
    AppNavigation: Navigation,
    AppBar,
  },
})
export default class Layout extends Vue {
  menu = false;

  notifications = 0;

  notificationsMenu = false;

  increment(): void {
    this.notifications += 1;
  }

  mounted(): void {
    if (this.$route.path === '/') {
      this.$router.push({ name: 'overview' });
    }
  }

  get username(): string {
    return this.$store.state.auth.username;
  }

  get currentRoute(): string | null | undefined {
    return this.$route.name;
  }
}
</script>

<style scoped>
</style>
