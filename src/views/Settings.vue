<template>
  <div class="white my-8">
  <v-row>
    <v-col cols="3">
      <v-tabs
        vertical
        class="fill-height"
        style="min-height: 500px;"
        background-color="#F7F7F7"
      >
        <v-tab :ripple="false" class="vertical-tabs"
            :to="{name: 'settings.account'}">
            <v-icon left>
              {{
                $route.name === 'settings.account' ?
                '$accountBlue' :
                '$account'
              }}
            </v-icon>{{ $t('settings.account.title') }}</v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
            v-if="context.organization &&
            $can('edit', context.organization)"
        :to="{name: 'settings.organization'}">
            <v-icon left>
              {{
                $route.name === 'settings.organization' ?
                '$organizationSettingsBlue' :
                '$organizationSettings'
              }}
            </v-icon>{{ $t('settings.organization.title') }}</v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.roles'}"
        v-if="context.organization &&
        $can('edit', context.organization)"
        >
            <v-icon left>
              {{
                $route.name === 'settings.roles' ?
                '$organizationRolesBlue' :
                '$organizationRoles'
              }}
            </v-icon>{{ $t('settings.organizationRoles.title') }}</v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.notifications'}">
            <v-icon left>
              {{
                $route.name === 'settings.notifications' ?
                '$notificationBlue' :
                '$notification'
              }}
            </v-icon>{{ $t('settings.notifications.title') }}</v-tab>
        <v-tab :ripple="false" class="vertical-tabs"
        :to="{name: 'settings.payment'}"
          v-if="context.organization &&
          $can('edit', context.organization)">
            <v-icon left>
              {{
                $route.name === 'settings.payment' ?
                '$paymentBlue' :
                '$payment'
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
import { defineComponent } from 'vue';
import useContextStore from '@/stores/context';

export default defineComponent({
  name: 'SettingsView',
  setup() {
    const context = useContextStore();
    return {
      context,
    };
  },
});
</script>

<style scoped>
</style>
