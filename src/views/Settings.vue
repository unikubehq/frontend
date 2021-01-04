<template>
  <v-container fill-height class="mt-5">
    <v-row>
      <v-tabs
        vertical
        height="1213"
        background-color="#F7F7F7"
      >
        <v-tab>
          <v-list-item-icon>
            <v-icon>$vuetify.icons.accountBlue</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Account Settings</v-list-item-title>
          </v-list-item-content>
        </v-tab>
        <v-tab>
          <v-list-item-icon>
            <v-icon>$vuetify.icons.accountBlue</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Organization Settings</v-list-item-title>
          </v-list-item-content>
        </v-tab>
        <v-tab>
          <v-list-item-icon>
            <v-icon>$vuetify.icons.accountBlue</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Organization Roles</v-list-item-title>
          </v-list-item-content>
        </v-tab>
        <v-tab>
          <v-list-item-icon>
            <v-icon>$vuetify.icons.accountBlue</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-left">Notifications</v-list-item-title>
          </v-list-item-content>
        </v-tab>
        <v-tab-item>
          <AccountSettings></AccountSettings>
        </v-tab-item>
        <v-tab-item>
          <OrganizationSettings></OrganizationSettings>
        </v-tab-item>
        <v-tab-item>
          <OrganizationRoles></OrganizationRoles>
        </v-tab-item>
        <v-tab-item>
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
