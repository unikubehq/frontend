<template>
  <div>
    <v-navigation-drawer app dark width="300" :mini-variant="mini" mini-variant-width="96">
      <template slot="append">
        <v-img src="@/assets/img/navigation_background.svg"/>
        <v-list style="position:absolute; bottom: 10px; left: 0; width: 100%;">
          <v-list-item link :ripple="false" to="/help">
            <v-list-item-icon>
              <v-icon>$vuetify.icons.help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Help</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <template slot="prepend">
        <v-list-item class="mt-2" :ripple="false">
          <v-list-item-content>
            <v-list-item-title class="title">
              <div class="d-flex"
                  :class="{'justify-space-between': !mini, 'justify-center': mini}">
                <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg"
                    max-height="45" max-width="164" contain v-if="!mini"/>
                <v-btn  icon @click="toggleMini" :ripple="false">
                  <v-icon medium class="d-block mt-2">
                    $vuetify.icons.burger
                  </v-icon>
                </v-btn>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-5">
          <v-list-item-content>
            <v-list-item-title class="subtitle-2 text-uppercase" v-if="!mini">
              Organizations
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-menu
            offset-y
            content-class="organization-dropdown"
            rounded="0"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-list-item class="mt-2 organization-dropdown--item" two-line v-bind="attrs" v-on="on"
                :ripple="false"
                :class="{'flex-wrap': mini}">
              <v-list-item-avatar>
                <img v-if="$store.state.context.organization"
                    :src="$store.state.context.organization.avatarImage">
                <img v-else src="" alt="">
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title
                    class="font-weight-bold"
                    v-if="$store.state.context.organization">
                  {{ currentOrganizationName }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Organization ID: 8900998
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-icon small class="float-right organization-dropdown--arrow" v-if="!mini">
                $vuetify.icons.arrowDownWhite
              </v-icon>
              <v-icon small class="organization-dropdown--arrow" v-if="mini">
                $vuetify.icons.arrowDownWhite
              </v-icon>
            </v-list-item>
          </template>
          <div class="organization-dropdown--notch"></div>
          <v-list v-if="allOrganizations">
            <v-list-item
                v-for="organization in allOrganizations.results"
                :key="organization.id"
                link
                :ripple="false"
                two-line
            >
              <v-list-item-avatar class="organization-dropdown--icon">
                <v-img :src="organization.avatarImage" max-width="35" contain/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="organization.title"></v-list-item-title>
                <v-list-item-subtitle v-text="organization.id"/>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item link  to="/create-organization">
                <v-list-item-icon class="organization-dropdown--icon">
                  <v-icon>$vuetify.icons.createOrganization</v-icon>
                </v-list-item-icon>
              <v-list-item-title class="text--secondary">
                Create New Organization
              </v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon class="organization-dropdown--icon">
                  <v-icon>$vuetify.icons.joinOrganization</v-icon>
                </v-list-item-icon>
              <v-list-item-title class="text--secondary">
                Join Another Organization
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-list>
        <v-list-item :ripple="false"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
            class="navigation-item"
            active-class="navigation-item--is-active"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" elevation="5" height="75">
      <v-toolbar-title class="font-weight-medium text-capitalize">
        {{ currentRoute }}
      </v-toolbar-title>
      <div class="d-flex flex-row justify-space-around align-center" style="width: 350px;">
        <v-menu
          v-model="notificationsMenu"
          offset-y
          nudge-bottom="5"
          nudge-left="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              text
            >
              <v-badge
                :content="notifications"
                :value="notifications"
                color="#ff5e5b"
                overlap
              >
                <v-icon
                  width="40"
                  height="40"
                  @click="increment"
                >
                  $vuetify.icons.notificationBlue
                </v-icon>
              </v-badge>
            </v-btn>
          </template>
          <v-card
            width="340"
          >
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
        <v-menu
          v-model="menu"
          offset-y
          nudge-bottom="5"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="343d6f"
              v-bind="attrs"
              v-on="on"
              text
            >
              <v-avatar class="mr-3">
                <img src="https://randomuser.me/api/portraits/women/81.jpg">
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
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { OrganizationsQuery } from '@/generated/graphql';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

@Component({
  apollo: {
    allOrganizations: {
      query: OrganizationsQuery,
      result(result) {
        this.$store.commit('context/setOrganization', result.data.allOrganizations.results[0]);
      },
    },
  },
})
export default class Layout extends Vue {
  items = [
    { icon: '$vuetify.icons.overview', title: 'Overview', to: '/overview' },
    { icon: '$vuetify.icons.permission', title: 'Permissions', to: '/permissions' },
    { icon: '$vuetify.icons.activity', title: 'Activity', to: '/activities' },
    { icon: '$vuetify.icons.settings', title: 'Settings', to: '/settings' },
  ];

  menu = false;

  mini = false;

  toggleMini(): void {
    this.mini = !this.mini;
  }

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

  get currentOrganizationName(): string {
    return this.$store.state.context.organization.title;
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
