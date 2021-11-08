<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-form class="white">
            <v-btn
              large
              block
              :ripple="false"
              color="primary"
              @click="overlay = true;"
              :disabled="$v.$invalid"
            >
              <v-icon class="ml-n2 mr-2">
                $vuetify.icons.addProject
              </v-icon>
              {{ $t('scripts.addNew') }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
    <script-form/>
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
import Drawer from '@/components/general/Drawer.vue';
import ScriptForm from '@/components/Projects/ScriptForm.vue';

@Component({
  validations: {
    port: {
      required,
      minValue: minValue(1024),
      maxValue: maxValue(65535),
    },
  },
  components: {
    Drawer,
    ScriptForm,
  },
})
export default class Scripts extends validationMixin {
  @Prop() readonly project: TProjectNode | undefined

  port: string | null = null

  loading = false

  get portErrors(): TranslateResult[] {
    return this.handleErrors('port');
  }

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
