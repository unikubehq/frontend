<template>
  <v-app-bar app color="white" elevation="5" height="75">
    <v-toolbar-title class="font-weight-medium text-capitalize">
      {{ currentRoute }}
    </v-toolbar-title>
    <div class="d-flex flex-row justify-space-around align-center" style="width: 350px;">
      <v-menu v-model="notificationsMenu" offset-y nudge-bottom="5" nudge-left="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-badge :content="notifications" :value="notifications" color="#ff5e5b" overlap>
              <v-icon width="40" height="40" @click="increment">
                $vuetify.icons.notificationBlue
              </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card width="340">
          <v-card-title>
            Notifications
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            Notification 1
          </v-card-text>
        </v-card>
      </v-menu>

      <v-divider vertical class="ml-3"></v-divider>
      <div>
        <v-menu v-model="menu" offset-y nudge-bottom="5">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="343d6f" v-bind="attrs" v-on="on" text>
              <v-avatar class="mr-3">
                <img src="@/assets/img/avatar.png">
              </v-avatar>
              <div class="d-flex flex-column text-left">
                <h3 class="mb-0">{{ username }}</h3>
                <p class="mb-0">Administrator</p>
              </div>
              <v-icon class="ml-4" small>$vuetify.icons.dropdown</v-icon>
            </v-btn>
          </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>$vuetify.icons.accountBlue</v-icon>
                  </v-list-item-icon>
                  Account Settings
                </v-list-item>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon>$vuetify.icons.logout</v-icon>
                  </v-list-item-icon>
                  Logout
                </v-list-item>
              </v-list>
            </v-card>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Navigation from '@/components/Navigation.vue';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

@Component({
  components: {
    AppNavigation: Navigation,
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
