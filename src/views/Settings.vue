<template>
  <v-container fluid fill-height class="mt-5 px-10">
    <v-row>
      <v-tabs
        vertical
        height="1213"
        background-color="#F7F7F7"
      >
        <v-tab :ripple="false" class="vertical-tabs">
            <v-icon left>$vuetify.icons.accountBlue</v-icon>
            Account Settings
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs">
            <v-icon left>$vuetify.icons.accountBlue</v-icon>
            Organization Settings
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs">
            <v-icon left>$vuetify.icons.accountBlue</v-icon>
            Organization Roles
        </v-tab>
        <v-tab :ripple="false" class="vertical-tabs">
            <v-icon left>$vuetify.icons.accountBlue</v-icon>
            Notifications
        </v-tab>
        <v-tab-item transition="fade-transition" reverse-transition="fade-transition">
          <AccountSettings></AccountSettings>
        </v-tab-item>
        <v-tab-item transition="fade-transition" reverse-transition="fade-transition">
          <OrganizationSettings></OrganizationSettings>
        </v-tab-item>
        <v-tab-item transition="fade-transition" reverse-transition="fade-transition">
          <OrganizationRoles></OrganizationRoles>
        </v-tab-item>
        <v-tab-item transition="fade-transition" reverse-transition="fade-transition">
          <NotificationSettings></NotificationSettings>
        </v-tab-item>
      </v-tabs>
    </v-row>
  </v-container>
</template>

<script>
import AccountSettings from '@/components/settings/AccountSettings.vue';
import OrganizationSettings from '@/components/settings/OrganizationSettings.vue';
import OrganizationRoles from '@/components/settings/OrganizationRoles.vue';
import NotificationSettings from '@/components/settings/NotificationSettings.vue';

export default {
  name: 'Settings.vue',
  components: {
    OrganizationRoles,
    AccountSettings,
    OrganizationSettings,
    NotificationSettings,
  },
};
</script>

<style scoped>

</style>
