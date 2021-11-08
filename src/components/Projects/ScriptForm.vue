<template>
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
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field
          label="Docker Image"
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
          label="Docker Image URL"
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
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field
          label="Access User"
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
          label="Access Secret"
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
    <v-row>
      <v-col cols="6" class="py-0">
        <v-text-field
          label="Interpreter"
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
          label="Service Account"
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
    <editor language="python"></editor>
    </v-form>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { validationMixin } from '@/components/mixins';
import Editor from '@/components/general/Editor.vue';

@Component({
  components: {
    Editor,
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
