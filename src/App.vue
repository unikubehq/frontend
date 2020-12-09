<template>
  <v-app>
    <router-view>
    </router-view>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
        color="#CEFFE9"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { OrganizationsQuery, TOrganizationsQueryResult } from '@/generated/graphql';
import { getModule } from 'vuex-module-decorators';
import Auth from '@/store/modules/auth';
import UI from '@/store/modules/ui';

export default Vue.extend({
  name: 'App',
  apollo: {
    organizations: {
      query: OrganizationsQuery,
      result: (result: TOrganizationsQueryResult) => {
        console.log(result.organizations);
      },
    },
  },
  computed: {
    overlay() {
      const ui = getModule(UI, this.$store);
      return ui.overlay;
    },
  },
  created() {
    const auth = getModule(Auth, this.$store);
    auth.refresh();
    this.$apollo.query(OrganizationsQuery).then(
      (result: TOrganizationsQueryResult) => {
        if (result && result.organizations) {
          console.log(result.organizations.filter((val) => { console.log(val); return false; }));
        } else {
          console.log('this is shitty!');
        }
      },
    );
  },
});
</script>

<style lang="scss">
@import "styles/main";

</style>
