<template>
  <div class="py-5">
    <h2>{{ $t('settings.account.title') }}</h2>
    <p>{{ $t('settings.account.intro') }}</p>
    <v-divider></v-divider>
    <v-row class="pt-3">
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
              class="pointer"
          >
            <label for="user-avatar-file">
              <input type="file"
                  style="display: none;"
                  id="user-avatar-file"
                  @change="handleUpload">
              <v-img width="96" contain ref="preview" alt="User Avatar"
                  :src="this.previewUrl || this.$store.state.auth.avatarImage || 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg'"/>
            </label>
          </v-avatar>
        </v-badge>
        <a href="#" class="text--secondary d-block mt-2">
          {{ $t('settings.account.removeAvatar') }}
        </a>
      </v-col>
      <v-col cols="8" class="mt-8">
        <v-row>
          <v-icon large>$vuetify.icons.personalInfo</v-icon>
          <h2 class="d-inline ml-2">{{ $t('settings.account.personalnformation') }}</h2>
        </v-row>
        <v-form>
          <v-text-field
              :label="$t('settings.account.fullName')"
              name="fullname"
              filled
              outlined
              type="text"
              :placeholder="$t('settings.account.enterName')"
              v-model="fullName"
              prepend-inner-icon="$vuetify.icons.user"
              @blur="$v.fullName.$touch()"
              @change="setDataChanged"
              persistent-placeholder
          />
          <v-text-field
              :label="$t('settings.account.email')"
              name="login"
              filled
              outlined
              disabled
              type="text"
              :placeholder="$t('settings.account.enterEmail')"
              v-model="email"
              @keyup.enter="register"
              prepend-inner-icon="$vuetify.icons.email"
              @blur="$v.email.$touch()"
              persistent-placeholder
          />
          <v-btn color="primary" :disabled="!dataChanged" large elevation="0" :ripple="false">
            {{ $t('general.saveChanges') }}
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="8" class="mt-8">
        <h2>{{ $t('settings.account.changePassword') }}</h2>
        <v-form>
          <v-text-field
              id="password"
              :label="$t('settings.account.oldPassword')"
              name="password"
              filled
              outlined
              :type="clearText ? 'text' : 'password'"
              :placeholder="$t('settings.account.enterOldPassword')"
              v-model="password"
              prepend-inner-icon="$vuetify.icons.password"
              :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
              @click:append="clearText = !clearText"
              @blur="$v.password.$touch()"
              persistent-placeholder
          >
          </v-text-field>
          <router-link class="link--secondary" to="/forgot-password">
            {{ $t('settings.account.forgotPassword') }}
          </router-link>
          <v-row>
            <v-col cols="6">
              <v-text-field
                  id="new-password"
                  :label="$t('settings.account.newPassword')"
                  name="new-password"
                  filled
                  outlined
                  :placeholder="$t('settings.account.enterNewPassword')"
                  v-model="newPassword"
                  prepend-inner-icon="$vuetify.icons.password"
                  :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                  @click:append="clearText = !clearText"
                  :type="clearText ? 'text' : 'password'"
                  persistent-placeholder

              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  id="new-password"
                  :label="$t('settings.account.reenterPassword')"
                  name="new-password"
                  filled
                  outlined
                  :placeholder="$t('settings.account.enterNewPassword')"
                  v-model="reEnterNewPassword"
                  prepend-inner-icon="$vuetify.icons.password"
                  :append-icon="clearText ? '$vuetify.icons.eyeOpen' : '$vuetify.icons.eye'"
                  @click:append="clearText = !clearText"
                  :type="clearText ? 'text' : 'password'"
                  persistent-placeholder

              ></v-text-field>
            </v-col>
          </v-row>
          <v-btn color="primary" disabled large elevation="0" :ripple="false">
            {{ $t('settings.account.setNewPassword') }}
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="8" class="mt-8">
        <h2>{{ $t('settings.account.disableAccount') }}</h2>
        <p>{{ $t('settings.account.disableExplanation') }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { UploadComponent } from '@/components/mixins';

@Component({})
export default class AccountSettings extends UploadComponent {
  dataChanged = false

  clearText = false

  password = ''

  newPassword = ''

  reEnterNewPassword = ''

  dialog = false

  uploadUrl = '/users-http/upload-avatar/';

  getUploadUrl(): string {
    return `${this.uploadUrl + this.$store.state.auth.uuid}/`;
  }

  uploadCallback(res: AxiosResponse): void {
    this.$store.commit('auth/setAvatar', res.data.url);
  }

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
