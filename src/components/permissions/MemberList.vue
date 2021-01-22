<template>
  <v-container>
    <v-simple-table>
      <thead class="member-thead">
        <tr>
          <th>Name</th>
          <th>Project</th>
          <th>Access to</th>
          <th>Role</th>
          <th>Last Online</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <member-detail v-for="user in allUsers.results" :key="user.id" :user="user"></member-detail>
      </tbody>
    </v-simple-table>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { AllUsersQuery } from '@/generated/graphql';
import MemberDetail from '@/components/permissions/MemberDetail.vue';

@Component({
  components: { MemberDetail },
  apollo: {
    allUsers: {
      query: AllUsersQuery,
      variables() {
        return {
          limit: this.limit,
          offset: this.offset,
        };
      },
    },
  },
})
export default class MemberList extends Vue {
 limit = 10;

 offset = 0;
}
</script>

<style lang="scss" scoped>
.member-thead {
  background-color: #9eaed7;
}

th:first-child {
  border-top-left-radius: 6px;
}

th:last-child {
  border-top-right-radius: 6px;
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: white;
}
</style>
