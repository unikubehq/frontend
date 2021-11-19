<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-form class="white">
          <v-row>
            <v-col cols="12" class="py-0">
            <v-text-field
                :label="$t('projects.specificationRepository')"
                name="specRepo"
                filled
                outlined
                type="text"
                :placeholder="$t('projects.enterSpecificationRepository')"
                v-model="specRepository"
                :error-messages="specRepositoryErrors"
                prepend-inner-icon="$vuetify.icons.repository"
                @blur="$v.specRepository.$touch()"
                persistent-placeholder
            />
            </v-col>
            <v-col cols="12" class="py-0">
            <v-text-field
                :label="$t('projects.specificationRepositoryBranch')"
                name="specRepoBranch"
                filled
                outlined
                type="text"
                :placeholder="$t('projects.enterSpecificationRepositoryBranch')"
                v-model="specRepositoryBranch"
                :error-messages="specRepositoryBranchErrors"
                prepend-inner-icon="$vuetify.icons.branch"
                @blur="$v.specRepositoryBranch.$touch()"
                persistent-placeholder
            />
            </v-col>
            <v-col cols="6" class="py-0">
            <v-text-field
                :label="$t('projects.accessUsername')"
                name="accessUsername"
                filled
                outlined
                type="text"
                :placeholder="$t('projects.enterAccessUsername')"
                v-model="accessUsername"
                :error-messages="accessUsernameErrors"
                prepend-inner-icon="$vuetify.icons.accessUser"
                @change="$v.accessUsername.$touch()"
                persistent-placeholder
            />
            </v-col>
            <v-col cols="6" class="py-0">
            <v-text-field
                :label="$t('projects.accessToken')"
                name="accessToken"
                filled
                outlined
                type="password"
                :placeholder="$t('projects.enterAccessToken')"
                v-model="accessToken"
                :error-messages="accessTokenErrors"
                prepend-inner-icon="$vuetify.icons.accessToken"
                @change="$v.accessToken.$touch()"
                persistent-placeholder
            />
            </v-col>
            </v-row>
            <v-row>
            <v-col cols="4">
                <v-btn
                large
                block
                :ripple="false"
                color="primary"
                @click="submit"
                :loading="loading"
                :disabled="$v.$invalid"
                >{{ $t('general.save') }}</v-btn>
                </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import {
  required, minValue, maxValue,
} from 'vuelidate/lib/validators';
import { TProjectNode } from '@/generated/graphql';
import { validationMixin } from '@/components/mixins';

@Component({
  validations: {
    port: {
      required,
      minValue: minValue(1024),
      maxValue: maxValue(65535),
    },
  },
})
export default class GitSettings extends validationMixin {
  @Prop() readonly project: TProjectNode | undefined

  loading = false
}
</script>

<style scoped lang="scss">
</style>
