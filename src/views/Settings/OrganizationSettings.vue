<template>
  <div class="py-5">
    <h2>Organization Settings</h2>
    <p>You can set organization basic information and can also remove it.</p>
    <v-divider></v-divider>
    <v-row>
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
            <label for="orga-avatar-file">
              <input type="file"
                  style="display: none;"
                  id="orga-avatar-file"
                  @change="handleUpload">
              <v-img width="96" contain :src="this.previewUrl || this.$store.state.context.organization.avatarImage || 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg'" ref="preview"></v-img>
            </label>
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
  </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { OrganizationQuery } from '@/generated/graphql';

@Component({})
export default class OrganizationSettings extends Vue {
  $refs!: {
    preview: HTMLImageElement
  }

  previewUrl: string | null = null

  dataChanged = false

  dialog = false

  get organizationName(): string {
    return this.$store.state.context.organization.title;
  }

  handleUpload(e: {target: HTMLInputElement}): void {
    if (e && e.target && e.target.files) {
      const file = e.target.files[0];
      this.previewUrl = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append('avatar_image', file);
      this.axios.post(`/orgas-http/upload-avatar/${this.$store.state.context.organization.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${this.$store.state.auth.rawRpt}`,
        },
      }).then((res) => {
        // Update organization from graphql
        this.$apollo.query({
          query: OrganizationQuery,
          variables: {
            id: this.$store.state.context.organization.id,
          },
        }).then((result) => {
          console.log(result);
          this.$store.commit('context/setOrganization', result.data.organization);
        });
        // res.data.url
      }).catch((err) => {
        // Handle error
      });
    }
  }

  setDataChanged(): void {
    this.dataChanged = true;
  }
}
</script>

<style>
.pointer .v-image:hover {
  cursor: pointer;
}
</style>
