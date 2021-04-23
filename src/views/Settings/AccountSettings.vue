<template>
  <div class="py-5">
    <h2>Account Settings</h2>
    <p>You can set your personal information and can also change your Password.</p>
    <v-divider></v-divider>
    <v-col cols="2">
      <v-badge
          bottom
          offset-x="20"
          offset-y="20"
          content="Edit"
      >
        <v-avatar
            height="96"
            width="96"
        >
          <img src="@/assets/img/avatar.png">
        </v-avatar>
      </v-badge>
    </v-col>
    <v-col cols="9" class="d-flex flex-column justify-center">
      <a href="#" class="text--secondary">Remove Picture</a>
    </v-col>
    <v-col cols="8" class="mt-8">
      <v-row>
        <v-icon large>$vuetify.icons.personalInfo</v-icon>
        <h2 class="d-inline ml-2">Personal Info</h2>
      </v-row>
      <v-form>
        <v-text-field
            :label="$t('Full Name')"
            name="fullname"
            filled
            outlined
            type="text"
            :placeholder="$t('Enter Full Name')"
            v-model="fullName"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.fullName.$touch()"
            @change="setDataChanged"
        />
        <v-text-field
            label="Email Address"
            name="login"
            filled
            outlined
            disabled
            type="text"
            placeholder="Enter Email Address"
            v-model="email"
            @keyup.enter="register"
            prepend-inner-icon="$vuetify.icons.email"
            @blur="$v.email.$touch()"
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
      <h2>Change Password</h2>
      <v-form>
        <v-text-field
            id="password"
            :label="$t('Old Password')"
            name="password"
            filled
            outlined
            :type="clearText ? 'text' : 'password'"
            :placeholder="$t('Enter Old Password')"
            v-model="password"
            prepend-inner-icon="$vuetify.icons.password"
            :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
            @click:append="clearText = !clearText"
            @blur="$v.password.$touch()"
        >
        </v-text-field>
        <router-link class="link--secondary" to="/forgot-password">
          {{ $t('Forgot password?') }}
        </router-link>
        <v-row>
          <v-col cols="6">
            <v-text-field
                id="new-password"
                :label="$t('New Password')"
                name="new-password"
                filled
                outlined
                :placeholder="$t('Enter New Password')"
                v-model="newPassword"
                prepend-inner-icon="$vuetify.icons.password"
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @click:append="clearText = !clearText"
                :type="clearText ? 'text' : 'password'"

            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
                id="new-password"
                :label="$t('Re-Enter New Password')"
                name="new-password"
                filled
                outlined
                :placeholder="$t('Enter New Password')"
                v-model="reEnterNewPassword"
                prepend-inner-icon="$vuetify.icons.password"
                :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                @click:append="clearText = !clearText"
                :type="clearText ? 'text' : 'password'"

            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn color="primary" disabled large elevation="0" :ripple="false">
          Set new Password
        </v-btn>
      </v-form>
    </v-col>
    <v-col cols="12">
      <v-divider></v-divider>
    </v-col>
    <v-col cols="8" class="mt-8">
      <h2>Deactivate Account</h2>
      <p>By doing this all your organizations and project/teams under your account will be
        permanently lost and you will not be able to retrieve..</p>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AccountSettings extends Vue {
  dataChanged = false

  clearText = false

  password = ''

  newPassword = ''

  reEnterNewPassword = ''

  dialog = false

  get fullName(): string {
    return this.$store.state.auth.username;
  }

  get email(): string {
    return this.$store.state.auth.email;
  }

  setDataChanged(): void {
    this.dataChanged = true;
  }
}
</script>

<style scoped>

</style>