<template>
  <div class="py-5">
    <h2>{{ $t('settings.organization.title') }}</h2>
    <p>{{ $t('settings.organization.intro') }}</p>
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
            <label for="orga-avatar-file">
              <input type="file"
                  style="display: none;"
                  id="orga-avatar-file"
                  @change="handleUpload">
              <v-img width="96" contain  ref="preview" alt="Organization Logo"
                  :src="this.previewUrl || context?.organization?.avatarImage || 'https://cdn.zeplin.io/5f84546964e43c2749571f59/assets/2192D830-FF56-4E41-8DBA-F504CEFA64FC.svg'"/>
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
            variant="outlined"
            type="text"
            :placeholder="$t('settings.organization.enterName')"
            v-model="organizationName"
            prepend-inner-icon="$user"
            @blur="$v.fullName.$touch()"
            @change="setDataChanged"
              persistent-placeholder
          />
          <v-btn color="primary" :disabled="!dataChanged" size="large" elevation="0">
            {{ $t('general.saveChanges') }}
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="8" class="mt-8">
      <danger-zone
        :explanation="$t('settings.account.disableExplanation')"
      >
        <h3>{{ $t('settings.organization.disable') }}</h3>
        <p>{{ $t('settings.organization.disableWarning') }}
          <a href="#">{{ $t('settings.organization.delete') }}</a>
        </p>
        <v-btn
          solid
          color="error"
          class="white--text"
        >{{ $t('settings.organization.delete') }}</v-btn>
      </danger-zone>
      </v-col>
      </v-row>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { OrganizationQuery } from '@/generated/graphql';
import DangerZone from '@/components/Settings/DangerZone.vue';
import setupUpload from '@/utils/upload';
import { AxiosError } from 'axios';
import { useQuery } from '@vue/apollo-composable';
import useContextStore from '@/stores/context';

export default defineComponent({
  components: {
    DangerZone,
  },
  setup() {
    const dataChanged = ref(false);
    const uploadUrl = '/orgas-http/upload-avatar/';
    const context = useContextStore();
    const variables = reactive({
      id: context?.organization?.id,
    });
    const uploadCallback = (): void => {
      const { result, error } = useQuery(OrganizationQuery, variables);
      if (result && !error) {
        context.setOrganization(result.value.organization);
      }
    };

    const uploadError = (err: AxiosError) => {
      console.log(err);
    };

    const setDataChanged = () => {
      dataChanged.value = true;
    };

    const { previewUrl, handleUpload } = setupUpload(
      `${uploadUrl}${context?.organization?.id}/`,
      uploadCallback,
      uploadError,
    );
    return {
      context,
      previewUrl,
      handleUpload,
      setDataChanged,
    };
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    organizationName(): string {
      return this.context?.organization?.title || '';
    },
  },
});
</script>

<style>
.pointer .v-image:hover {
  cursor: pointer;
}
</style>
