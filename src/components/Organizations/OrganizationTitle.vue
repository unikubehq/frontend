<template>
  <v-col cols="12" sm="8" md="3">
    <h1 class="text-h1">{{ $t('organization.createNewOrganization') }}</h1>
    <p class="text--secondary">{{ $t('organization.createNameOfOrganization') }}</p>
    <v-form class="text-center" submit.prevent="">
      <v-text-field
          class="mt-6"
          id="organizationName"
          label="Organization Name"
          name="organizationName"
          filled
          variant="outlined"
          placeholder="Enter Organization Name"
          v-model="title"
          :error-messages="titleErrors"
          prepend-inner-icon="$organization"
          @blur="$v.title.$touch()"
          @keydown.enter.prevent="handleCreateOrganization"
          persistent-placeholder
      >
      </v-text-field>
      <v-btn
          block
          color="primary"
          size="large"
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
import {
  computed,
  defineComponent,
  Ref,
  ref,
} from 'vue';
import { required } from '@vuelidate/validators';
import VueI18n from 'vue-i18n';
import { CreateOrganizationMutation } from '@/generated/graphql';
import getErrorMessage from '@/utils/validations';
import useVuelidate, { ValidationArgs } from '@vuelidate/core';
import useAuthStore from '@/stores/auth';
import TranslateResult = VueI18n.TranslateResult;

export default defineComponent({
  setup() {
    const title = ref('');
    const auth = useAuthStore();
    const rules = computed(() => ({
      title: {
        required,
      },
    }));
    // TODO change this casting when vuelidate is updated
    const v = useVuelidate(rules as unknown as ValidationArgs<{title: Ref<string>}>, {
      title,
    });
    return {
      $v: v,
      title,
      auth,
    };
  },
  data() {
    return {
      loading: false,
      errors: [] as TranslateResult[],
    };
  },
  computed: {
    enableButton(): boolean {
      return this.$v.title.$invalid;
    },
    titleErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.title.$errors);
    },
  },
  methods: {
    handleCreateOrganization(): void {
      this.loading = true;
      this.$apollo.mutate({
        mutation: CreateOrganizationMutation,
        variables: {
          title: this.title,
        },
      }).then(({ data }) => {
        this.loading = false;
        this.auth.refresh(-1).then((refreshed: boolean) => {
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
    },
  },
});
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
