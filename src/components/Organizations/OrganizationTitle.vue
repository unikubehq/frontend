<template>
  <v-col cols="12" sm="8" md="3">
    <h1 class="text-h1">{{ $t('organization.createNewOrganization') }}</h1>
    <p class="text--secondary">{{ $t('organization.createNameOfOrganization') }}</p>
    <v-form class="text-center">
      <v-text-field
          class="mt-6"
          id="organizationName"
          label="Organization Name"
          name="organizationName"
          filled
          outlined
          placeholder="Enter Organization Name"
          v-model="title"
          :error-messages="titleErrors"
          prepend-inner-icon="$vuetify.icons.organization"
          @blur="$v.title.$touch()"
          persistent-placeholder
      >
      </v-text-field>
      <v-btn
          block
          color="primary"
          large
          elevation="0"
          :ripple="false"
          @click="handleCreateOrganization"
          :loading="loading"
          :disabled="enableButton"
      >{{ $t('general.next') }}</v-btn>
      <div class="error" v-if="errors && errors.detail">
        {{ errors.detail }}
      </div>
    </v-form>
  </v-col>

</template>
<script lang="ts">
import { Component } from 'vue-property-decorator';
import { required } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import { CreateOrganizationMutation } from '@/generated/graphql';
import { validationMixin } from '@/components/mixins';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
    title: {
      required,
    },
  },
})
export default class OrganizationTitle extends validationMixin {
  loading = false

  title = '';

  errors: TranslateResult[] = [];

  get enableButton(): boolean {
    return this.$v.title.$invalid;
  }

  get titleErrors(): TranslateResult[] {
    return this.handleErrors('title');
  }

  handleCreateOrganization(): void {
    this.loading = true;
    this.$apollo.mutate({
      mutation: CreateOrganizationMutation,
      variables: {
        title: this.title,
      },
    }).then(({ data }) => {
      this.loading = false;
      this.$store.dispatch('auth/refresh', -1).then((refreshed: boolean) => {
        if (refreshed) {
          this.$emit(
            'success',
            data.createUpdateOrganization?.organization,
          );
        } else {
          console.log('Something went wrong creating a new organization.');
        }
      });
    });
  }
}
</script>

<style lang="scss" scoped>
.logo--bottom {
  position: absolute;
  bottom: -13%;
  right: -60px;
  opacity: 0.1;
}

.dropzone {
  border: dashed 1px #e5e5e5;
  width: 400px;
  height: 225px;
}

</style>
