<template>
  <div class="py-5">
      <h2>{{ $t('settings.roles.title') }}</h2>
      <p>{{ $t('settings.roles.intro') }}</p>
      <v-divider></v-divider>
    <v-row>
      <v-col cols="8" class="mt-8">
        <h2>{{ $t('settings.roles.assign') }}</h2>
        <v-form>
          <v-row no-gutters>
            <v-col cols="8">
              <v-text-field
                :label="$t('general.email')"
                name="email"
                filled
                outlined
                type="text"
                :placeholder="$t('settings.account.enterEmail')"
                v-model="email"
                prepend-inner-icon="$vuetify.icons.user"
                @blur="$v.fullName.$touch()"
                @change="setDataChanged"
                  persistent-placeholder
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
                  persistent-placeholder
              ></v-select>
            </v-col>
          </v-row>

          <v-btn color="primary" :disabled="!dataChanged" large elevation="0" :ripple="false">
            {{ $t('general.saveChanges') }}
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="10" class="mt-8">
        <h2>{{ $t('settings.roles.existing') }}</h2>
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left text--white">{{ $t('settings.roles.name') }}</th>
              <th class="text-left">{{ $t('settings.roles.role') }}</th>
              <th class="text-left">{{ $t('settings.roles.actions') }}</th>
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
              <td>{{ $t('settings.roles.admin') }}</td>
              <td>{{ $t('settings.roles.addAnother') }}</td>
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
