<template>
  <v-container fluid fill-height class="mt-5 px-10">
    <v-row>
      <v-col cols="3">
        <v-tabs
          vertical
          height="1213"
          background-color="#F7F7F7"
        >
          <v-tab :ripple="false" class="vertical-tabs"
              :to="{name: 'settings.account'}">
              <v-icon left>$vuetify.icons.accountBlue</v-icon>
              Account <Settings></Settings>
          </v-tab>
          <v-tab :ripple="false" class="vertical-tabs"
          :to="{name: 'settings.notifications'}">>
              <v-icon left>$vuetify.icons.accountBlue</v-icon>
              Organization Settings
          </v-tab>
          <v-tab :ripple="false" class="vertical-tabs"
          :to="{name: 'settings.roles'}">>
              <v-icon left>$vuetify.icons.accountBlue</v-icon>
              Organization Roles
          </v-tab>
          <v-tab :ripple="false" class="vertical-tabs"
          :to="{name: 'settings.organization'}">>
              <v-icon left>$vuetify.icons.accountBlue</v-icon>
              Notifications
          </v-tab>
  <!--        <v-tab-item transition="fade-transition" reverse-transition="fade-transition">-->
  <!--          -->
  <!--        </v-tab-item>-->
        </v-tabs>
      </v-col>
      <v-col cols="9">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Settings.vue',
};
</script>

<style scoped>

</style>
