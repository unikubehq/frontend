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
                  :src="avatarImage"/>
            </label>
          </v-avatar>
        </v-badge>
        <a href="#" class="text--secondary d-block mt-2" @click="deleteAvatar">
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
              disabled
              type="text"
              :placeholder="$t('settings.account.enterName')"
              v-model="fullName"
              prepend-inner-icon="$vuetify.icons.user"
              @blur="$v.fullName.$touch()"
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
          <div class="mb-3">
            {{ $t('settings.account.updateProfileInformation') }}
            <a
              href="#"
              class="link--secondary"
              @click="changeGeneralInformation">
              {{ $t('settings.account.generalInformation') }}
            </a>
          </div>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="8" class="mt-8">
        <h2>{{ $t('settings.account.changePassword') }}</h2>
        <div class="mb-3">
          {{ $t('settings.account.updatePassword') }}
        <a
          class="link--secondary"
          href="#"
          @click="updatePassword">
          {{ $t('settings.account.setNewPassword') }}
        </a>
        </div>
      </v-col>
      <v-col cols="8" class="mt-8">
        <danger-zone
          :explanation="$t('settings.account.disableExplanation')"
        >
          <h3>{{ $t('settings.account.disableAccount') }}</h3>
          <p>{{ $t('settings.account.disableExplanation') }}</p>
        </danger-zone>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { AxiosResponse } from 'axios';
import { DeleteAvatarMutation, TDeleteAvatarMutationResult } from '@/generated/graphql';
import { UploadComponent } from '@/components/mixins';
import DangerZone from '@/components/Settings/DangerZone.vue';

@Component({
  components: {
    DangerZone,
  },
})
export default class AccountSettings extends UploadComponent {
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

  deleteAvatar(): void {
    this.$apollo.mutate({
      mutation: DeleteAvatarMutation,
      variables: {
        id: this.$store.state.auth.uuid,
      },
    }).then((data) => {
      const res: TDeleteAvatarMutationResult = data.data;
      if (res?.deleteAvatar?.ok) {
        this.previewUrl = '';
        this.$store.commit('auth/setAvatar', '');
      }
    });
  }

  get fullName(): string {
    return this.$store.state.auth.username;
  }

  get email(): string {
    return this.$store.state.auth.email;
  }

  get avatarImage(): string {
    return this.previewUrl || this.$store.state.auth.avatarImage || 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg';
  }

  updatePassword(): void {
    this.$store.state.auth.client.login({ action: 'UPDATE_PASSWORD' });
  }

  changeGeneralInformation(): void {
    this.$store.state.auth.client.login({ action: 'UPDATE_PROFILE' });
  }
}
</script>

<style scoped>

</style>
