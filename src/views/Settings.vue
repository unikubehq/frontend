<template>
  <div class="white">
  <v-row>
    <v-col cols="3">
      <v-tabs
        vertical
        height="1213"
        background-color="#F7F7F7"
      >
        <v-tab :ripple="false" class="vertical-tabs"
            :to="{name: 'settings.account'}">
            <v-icon left>
              {{
                $route.name === 'settings.account' ?
                '$vuetify.icons.accountBlue' :
                '$vuetify.icons.account'
              }}
            </v-icon>
            Account Settings
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.organization'}">
            <v-icon left>
              {{
                $route.name === 'settings.organization' ?
                '$vuetify.icons.organizationSettingsBlue' :
                '$vuetify.icons.organizationSettings'
              }}
            </v-icon>
            Organization Settings
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.roles'}">
            <v-icon left>
              {{
                $route.name === 'settings.roles' ?
                '$vuetify.icons.organizationRolesBlue' :
                '$vuetify.icons.organizationRoles'
              }}
            </v-icon>
            Organization Roles
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.notifications'}">
            <v-icon left>
              {{
                $route.name === 'settings.notifications' ?
                '$vuetify.icons.notificationBlue' :
                '$vuetify.icons.notification'
              }}
            </v-icon>
            Notifications
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.payment'}">
            <v-icon left>
              {{
                $route.name === 'settings.payment' ?
                '$vuetify.icons.paymentBlue' :
                '$vuetify.icons.payment'
              }}
            </v-icon>
            Payment
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
    </div>
</template>

<script lang="ts">

export default {
  name: 'Settings.vue',
};
</script>

<style scoped>
</style>
