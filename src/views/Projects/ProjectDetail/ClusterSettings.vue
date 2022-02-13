<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-form class="white">
          <v-row>
            <v-col>
              <v-text-field
                label="Port"
                name="port"
                filled
                outlined
                type="number"
                placeholder="Enter Port"
                v-model="port"
                :error-messages="portErrors"
                @blur="$v.port.$touch()"
                prepend-inner-icon="$vuetify.icons.projectInput"
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
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import {
  required, minValue, maxValue,
} from '@vuelidate/validators';
import VueI18n from 'vue-i18n';
import {
  TProjectNode,
  TUpdateClusterSettingsInput, TUpdateClusterSettingsPayload, UpdateClusterSettings,
} from '@/generated/graphql';
import { FetchResult } from '@apollo/client';
import useVuelidate from '@vuelidate/core';
import getErrorMessage from '@/utils/validations';
import useErrorStore from '@/stores/errors';
import TranslateResult = VueI18n.TranslateResult;

export default defineComponent({
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
      required: false,
    },
  },
  setup() {
    const port = ref('');
    const rules = computed(() => ({
      port: {
        required,
        minValue: minValue(1024),
        maxValue: maxValue(65535),
      },
    }));
    const v = useVuelidate(rules, { port });
    const errorStore = useErrorStore();
    return {
      errorStore,
      $v: v,
      port,
    };
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    portErrors(): TranslateResult[] {
      return getErrorMessage(this.$v.port.$errors);
    },
  },
  methods: {
    submit(): void {
      if (!this.port || !this.project || !this.project.clusterSettings) {
        return;
      }
      const variables: TUpdateClusterSettingsInput = {
        clientMutationId: null,
        id: this.project.clusterSettings.id,
        port: parseInt(this.port, 10),
        project: this.project.id,
      };
      this.loading = true;
      this.$apollo.mutate({
        mutation: UpdateClusterSettings,
        variables: {
          input: variables,
        },
      })
        .then((res: FetchResult<TUpdateClusterSettingsPayload>) => {
          this.loading = false;
          if (res.data?.clusterSettings?.port) {
            this.port = res.data.clusterSettings.port?.toString();
          }
          this.$emit('update');
        })
        .catch((err) => {
          this.loading = false;
          this.errorStore.setError({
            error: err,
            code: 300,
            location: 'ClusterSettings',
          });
        });
    },
  },
  watch: {
    project: {
      immediate: true,
      handler(newValue: TProjectNode): void {
        this.port = newValue.clusterSettings?.port?.toString() || '65335';
      },
    },
  },
});
</script>

<style scoped lang="scss">
</style>
