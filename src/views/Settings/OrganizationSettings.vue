<template>
  <div class="py-5">
    <h2>{{ $t('settings.organization.title') }}</h2>
    <p>{{ $t('settings.organization.intro') }}</p>
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
        <h2>{{ $t('settings.organization.info') }}</h2>
        <v-form>
          <v-text-field
            :label="$t('settings.organization.name')"
            name="fullname"
            filled
            outlined
            type="text"
            :placeholder="$t('settings.organization.enterName')"
            v-model="organizationName"
            prepend-inner-icon="$vuetify.icons.user"
            @blur="$v.fullName.$touch()"
            @change="setDataChanged"
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
        <h2>{{ $t('settings.organization.disable') }}</h2>
        <p>{{ $t('settings.organization.disableWarning') }}
          <a href="#">{{ $t('settings.organization.delete') }}</a>
        </p>
      </v-col>
      </v-row>
  </div>

</template>

<script lang="ts">
import { Component, Ref } from 'vue-property-decorator';
import { OrganizationQuery } from '@/generated/graphql';
import { UploadComponent } from '@/components/mixins';

@Component({})
export default class OrganizationSettings extends UploadComponent {
  @Ref() readonly preview!: HTMLImageElement

  previewUrl: string | null = null

  dataChanged = false

  dialog = false

  uploadUrl = '/orgas-http/upload-avatar/';

  get organizationName(): string {
    return this.$store.state.context.organization.title;
  }

  getUploadUrl(): string {
    return `${this.uploadUrl + this.$store.state.context.organization.id}/`;
  }

  uploadCallback(): void {
    this.$apollo.query({
      query: OrganizationQuery,
      variables: {
        id: this.$store.state.context.organization.id,
      },
    }).then((result) => {
      this.$store.commit('context/setOrganization', result.data.organization);
    });
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
