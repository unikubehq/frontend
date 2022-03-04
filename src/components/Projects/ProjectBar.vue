<template>
  <v-row>
    <v-col cols="12" lg="2" class="d-flex align-center">
      <h2 style="font-weight: 500;">{{ t('projects.projectList') }}</h2>
    </v-col>
    <v-col cols="12" lg="10" class="d-flex align-start mt-n12 mt-lg-5">
      <v-text-field variant="outlined" filled prepend-inner-icon="$search" v-model="search"
          placeholder="Search" persistent-placeholder @input="$emit('search-change', search)"
          class="search__input"/>
      <v-select
        prefix="Sort:"
        class="mx-2 projects__order-dropdown"
        variant="outlined"
         filled
        :items="orderChoices"
        item-text="text"
        item-value="value"
        v-model="orderChoice"
        @change="$emit('sort-change', orderChoice)"
        persistent-placeholder
      >
      </v-select>
      <v-btn
        class="mb-2 projects__createButton"
        color="primary"
        size="large"
        elevation="0"
        :ripple="false"
        to="/create-project"
      >
        <v-icon class="ml-n2 mr-2">$addProject</v-icon>
        {{ t('projects.addNewProject') }}
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import VueI18n, { useI18n } from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

export default defineComponent({
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    return {
      t,
    };
  },
  data() {
    return {
      orderChoice: 'az',
      search: '',
      projects: [],
    };
  },
  computed: {
    orderChoices(): Array<{[key:string]: TranslateResult}> {
      return [
        { value: 'az', title: this.t('A-Z ascending') },
        { value: 'za', title: this.t('A-Z descending') },
      ];
    },
  },
});
</script>
<style scoped>

</style>
