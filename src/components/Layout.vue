<template>
  <div>
    <v-navigation-drawer app dark width="300">
      <template slot="append">
        <v-img  src="@/assets/img/navigation_background.svg"/>
      </template>
      <template slot="prepend">
      <v-list-item class="mt-2">
        <v-list-item-content>
          <v-list-item-title class="title">
            <div class="d-flex justify-space-between">
              <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg"
                     max-height="45" max-width="164" contain/>
              <v-icon medium class="d-block mr-3 mt-2">
                $vuetify.icons.burger
              </v-icon>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mt-5">
        <v-list-item-content>
          <v-list-item-title class="subtitle-1 text-uppercase">
            Organizations
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item class="mt-2" two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
              <v-list-item-subtitle>Logged In</v-list-item-subtitle>
            </v-list-item-content>
      </v-list-item>
      </template>

      <v-list>
        <v-list-item :ripple="false"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
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
    <v-app-bar app color="white" elevation="5">
      <v-toolbar-title>Overview</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </div>
</template>

<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component()
export default class Layout extends Vue {
  items = [
    { icon: '$vuetify.icons.overview', title: 'Overview', to: 'test' },
    { icon: '$vuetify.icons.permission', title: 'Permissions', to: 'test' },
    { icon: '$vuetify.icons.activity', title: 'Activity', to: 'test' },
    { icon: '$vuetify.icons.settings', title: 'Settings', to: 'test' },
  ];

  mounted() {
    if (!this.$route.name === 'Overview') {
      this.$router.push({ name: 'Overview' });
    }
  }
}
</script>

<style scoped>
</style>
