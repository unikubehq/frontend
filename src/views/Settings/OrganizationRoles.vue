<template>
  <div class="py-5">
      <h2>Organization Roles</h2>
      <p>You can set organization basic information and can also remove it.</p>
      <v-divider></v-divider>
    <v-row>
      <v-col cols="8" class="mt-8">
        <h2>Assign New Role</h2>
        <v-form>
          <v-row no-gutters>
            <v-col cols="8">
              <v-text-field
                :label="$t('Email Address')"
                name="email"
                filled
                outlined
                type="text"
                :placeholder="$t('Enter Email Address')"
                v-model="email"
                prepend-inner-icon="$vuetify.icons.user"
                @blur="$v.fullName.$touch()"
                @change="setDataChanged"
              />
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="select"
                :items="roles"
                item-text="role"
                label="Roles"
                outlined
                hide-details="auto"
              ></v-select>
            </v-col>
          </v-row>

          <v-btn color="primary" :disabled="!dataChanged" large elevation="0" :ripple="false">
            Save Changes
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="10" class="mt-8">
        <h2>Existing Organization Roles</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left text--white">Name</th>
              <th class="text-left">Role</th>
              <th class="text-left">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td class="d-flex pt-3">
                <v-avatar class="mr-3">
                  <img src="https://randomuser.me/api/portraits/women/81.jpg">
                </v-avatar>
                <div class="d-flex flex-column">
                  <h3 class="mb-0">Robert Stein</h3>
                  <p class="mb-0">robert@blueshoe.de</p>
                </div>
              </td>
              <td>Admin</td>
              <td>You can only edit/delete a role after another admin is added</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      </v-row>
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OrganizationRoles extends Vue {
  email = ''

  dataChanged = false

  dialog = false

  select = { role: 'Admin' }

  roles = [
    { role: 'Admin' },
    { role: 'Developer' },
  ]

  setDataChanged(): void {
    this.dataChanged = true;
  }
}
</script>

<style scoped>

</style>
