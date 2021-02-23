<template>
<tr v-if="!edit">
  <td>
    <v-avatar class="mr-3 mt-2" size="40">
      <img src="https://randomuser.me/api/portraits/women/81.jpg">
    </v-avatar>
    {{ user.firstName }} {{ user.lastName }} <br>
    <span class="ml-14 mt-n5 d-block">{{ user.email }}</span>
  </td>
  <td>Project</td>
  <td>access to</td>
  <td>{{ user.organizations.role }}</td>
  <td>{{ user.organizations.role }}</td>
  <td>
    <v-icon size="24" @click="setEdit">$vuetify.icons.edit</v-icon>
    <v-icon size="24">$vuetify.icons.delete</v-icon>
  </td>
</tr>
<tr v-else>
    <td>
      <v-avatar class="mr-3" size="40">
        <img src="https://randomuser.me/api/portraits/women/81.jpg">
      </v-avatar>
      {{ user.firstName }} {{ user.lastName }}
    </td>
    <td>
      <v-select
        outlined
        filled
        height="40"
        full-width
        :items="projectChoices"
        v-model="project"
        multiple
        placeholder="None"
        dense
      >
      </v-select>
    </td>
    <td>
      <v-select
        outlined
        filled
        height="40"
        full-width
        :items="projectChoices"
        v-model="project"
        multiple
        placeholder="None"
        dense
      >
      </v-select>
    </td>
    <td>
      <v-select
        outlined
        filled
        height="40"
        full-width
        :items="projectChoices"
        v-model="project"
        multiple
        placeholder="None"
        dense
      >
      </v-select>
    </td>
    <td></td>
    <td>
      <v-btn
        color="primary"
        small
        @click="setEdit"
      >Save</v-btn>
    </td>
</tr>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import { TUserNode } from '@/generated/graphql';
// import { verboseDateMixin } from '@/components/mixins';

@Component({})
export default class MemberDetail extends Vue {
// @Prop() readonly user: TUserNode | undefined

  edit = false;

  project = ['FF Automation Hub']

  projectChoices = [
    'FF Automation Hub',
    'Unikube',
  ]

  setEdit(): void {
    this.edit = !this.edit;
  }
}
</script>

<style scoped>
.v-input__slot {
  max-width: 130px;
}
td {
  height: 80px !important;
}
td:first-child {
  max-width: 130px;
}
</style>
