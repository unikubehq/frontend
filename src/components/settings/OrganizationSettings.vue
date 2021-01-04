<template>
  <v-container class="pa-8">
    <v-row>
      <v-col cols="12">
        <h2>Organization Settings</h2>
        <p>You can set organization basic information and can also remove it.</p>
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12">
        <v-badge
          bottom
          offset-x="20"
          offset-y="20"
          content="Add"
        >
          <v-avatar
            height="96"
            width="96"
          >
            <img src="https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg">
          </v-avatar>
        </v-badge>
      </v-col>
      <v-col cols="8" class="mt-8">
        <h2>Organization Info</h2>
        <v-form>
          <v-text-field
            :label="$t('Organization Name')"
            name="fullname"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Full Name')"
            v-model="organizationName"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.fullName.$touch()"
            @change="setDataChanged"
          />
          <v-btn color="primary" :disabled="!dataChanged" large elevation="0" :ripple="false">
            Save Changes
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="8" class="mt-8">
        <h2>Deactivate Account</h2>
        <p>By doing this all your organizations and project/teams under your account will be
          permanently lost and you will not be able to retrieve..
          <a href="#">Delete organization</a>
        </p>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  name: 'OrganizationSettings.vue',

  data() {
    return {
      organizationName: 'The Orange Co',
      dataChanged: false,
      dialog: false,
    };
  },
  methods: {
    setDataChanged() {
      this.dataChanged = true;
    },
  },
};
</script>

<style scoped>

</style>
