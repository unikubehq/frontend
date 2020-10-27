<template>
  <v-app>
    {{ $t("hello2") }}
    {{ organizations }}
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { OrganizationsQuery, TOrganizationsQueryResult } from '@/generated/graphql';

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
  created() {
    console.log(123);
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
