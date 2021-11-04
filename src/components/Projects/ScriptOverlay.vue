<template>
  <drawer
    title="Create a new scrip 1t"
    intro="Super new script creation"
    @hide="$emit('hide')"
  >
    <v-form>
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field
          label="Title"
          name="title2"
          filled
          outlined
          type="text"
          :placeholder="$t('deck.edit.environments.enterTitle')"
          v-model="title"
          @blur="$v.title.$touch()"
          :error-messages="titleErrors"
          prepend-inner-icon="$vuetify.icons.user"
            persistent-placeholder
        />
      </v-col>
      <v-col cols="6" class="py-0">
        <v-text-field
          label="Title"
          name="title1"
          filled
          outlined
          type="text"
          :placeholder="$t('deck.edit.environments.enterTitle')"
          v-model="title2"
          @blur="$v.title.$touch()"
          :error-messages="titleErrors"
          prepend-inner-icon="$vuetify.icons.user"
            persistent-placeholder
        />
      </v-col>
    </v-row>
    </v-form>
    <template v-slot:actions>123</template>
  </drawer>
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

@Component({
  components: {
    Drawer,
  },
})
export default class ScriptOverlay extends validationMixin {
  title = '';

  title2 = '';

  titleErrors = [];
}
</script>

<style scoped lang="scss">
</style>
