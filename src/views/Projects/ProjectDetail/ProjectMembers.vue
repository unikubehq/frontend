<template>
  <div>
    <v-simple-table class="table__unikube">
      <template v-slot:default>
        <thead class="member-thead">
        <tr>
          <th class="text-left">{{ $t('user.name') }}</th>
          <th class="text-left">{{ $t('user.role') }}</th>
          <th class="text-left">{{ $t('user.lastOnline') }}</th>
          <th class="text-left">{{ $t('user.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="member in project.members" :key="member.id" class="mb-3">
          <td>
            <div class="d-flex">
              <unikube-avatar :avatar="memberToAvatar(member)"/>
              <div class="d-flex flex-column ml-4">
                <h3 class="mb-0">
                  {{ member.user.givenName }} {{ member.user.familyName }}
                </h3>
                <p class="mb-0">{{ member.user.email }}</p>
              </div>
            </div>
          </td>
          <td>{{ member.role }}</td>
          <td>{{ member.user.lastLogin }}</td>
          <td>
            <v-icon size="24">$vuetify.icons.edit</v-icon>
            <v-icon size="24">$vuetify.icons.delete</v-icon>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-btn :ripple="false" plain elevation="0" @click="memberDrawer = true"
           color="rgb(252,252,253)" class="mt-2">
      <v-icon size="24" class="mr-2">
        $vuetify.icons.addRound
      </v-icon>{{ $t('user.addAnother') }}
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  TProjectNode,
} from '@/generated/graphql';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import Converter from '@/utils/converter';

@Component({
  components: {
    UnikubeAvatar,
  },
})
export default class ProjectPackages extends Vue {
  @Prop() readonly project!: TProjectNode;

  memberToAvatar = Converter.memberToAvatar;
}
</script>

<style lang="scss" scoped>
.table__unikube {
  border: 1px solid #c4ccd4;
  border-radius: 7px;
  .member-thead {
    background-color: #9eaed7;

    th {
      padding-top: 11px !important;
      padding-bottom: 10px !important;
      font-size: 14px;
      font-weight: 500;
    }

    th:first-child {
      padding-left: 5%;
    }
  }
  td:first-child {
    padding-left: 5% !important;
  }
  td {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: white;
}
</style>
