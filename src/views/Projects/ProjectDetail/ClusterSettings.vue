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
import { Component, Prop, Watch } from 'vue-property-decorator';
import {
  required, minValue, maxValue,
} from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import {
  TProjectNode,
  TUpdateClusterSettingsInput, TUpdateClusterSettingsPayload, UpdateClusterSettings,
} from '@/generated/graphql';
import { validationMixin } from '@/components/mixins';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
    port: {
      required,
      minValue: minValue(1024),
      maxValue: maxValue(65535),
    },
  },
})
export default class ClusterSettings extends validationMixin {
  @Prop() readonly project: TProjectNode | undefined

  port: string | null = null

  loading = false

  get portErrors(): TranslateResult[] {
    return this.handleErrors('port');
  }

  submit(): void {
    if (!this.port || !this.project) {
      return;
    }
    const variables: TUpdateClusterSettingsInput = {
      id: this.project?.clusterSettings?.id,
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
      .then((data: TUpdateClusterSettingsPayload) => {
        this.loading = false;
        if (data?.clusterSettings?.port) {
          this.port = data.clusterSettings.port?.toString();
        }
        this.$emit('update');
      })
      .catch((err) => {
        this.loading = false;
        this.$store.commit({
          type: 'errors/setError',
          error: err,
          message: 'Something went wrong.',
          location: 'ClusterSettings',
        });
      });
  }

  @Watch('project', { immediate: true })
  projectChanged(newValue: TProjectNode): void {
    this.port = newValue.clusterSettings?.port?.toString() || '65335';
  }
}
</script>

<style scoped lang="scss">
</style>
