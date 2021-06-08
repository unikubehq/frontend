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
            <v-btn color="343d6f" v-bind="attrs" v-on="on" text :ripple="false" class="py-9">
              <v-avatar
                size="46"
                class="avatar__unikube mr-3"
                :style="avatarStyles">
                <img v-if="$store.state.auth.avatarImage" :src="$store.state.auth.avatarImage">
                <span v-else-if="$store.state.context.organizationMember">
                  {{ avatar.initials }}
                </span>
                <img v-else src="@/assets/img/avatar.svg">
              </v-avatar>
              <div class="d-flex flex-column text-left">
                <h3 class="mb-0">{{ username }}</h3>
                <p class="mb-0 text-capitalize" v-if="$store.state.context.organizationMember"
                    v-text="$store.state.context.organizationMember.role" />
              </div>
              <v-icon class="ml-4" small>$vuetify.icons.dropdown</v-icon>
            </v-btn>
          </template>
            <v-card>
              <v-list nav>
                <v-list-item-group>
                  <v-list-item :ripple="false" @click="$router.push({name: 'settings.account'})">
                    <v-list-item-icon>
                      <v-icon>$vuetify.icons.accountBlue</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t('navigation.accountSettings')" />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item :ripple="false" @click="$store.dispatch('auth/logout')">
                    <v-list-item-icon>
                      <v-icon>$vuetify.icons.logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t('navigation.logout')" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Navigation from '@/components/Navigation.vue';
import { AvatarMixin } from '@/components/mixins';
import { Avatar } from '@/typing';
import Converter from '@/utils/converter';

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
export default class Layout extends AvatarMixin {
  menu = false;

  notifications = 0;

  notificationsMenu = false;

  get avatar(): Avatar {
    return Converter.memberToAvatar(this.$store.state.context.organizationMember);
  }

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
    return this.$route.meta.label;
  }
}
</script>

<style scoped>
</style>
