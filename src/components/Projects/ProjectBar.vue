<template>
  <v-row>
    <v-col cols="12" lg="2" class="d-flex align-center">
      <h2 style="font-weight: 500;">{{ $t('projects.projectList') }}</h2>
    </v-col>
    <v-col cols="12" lg="10" class="d-flex align-center mt-n12 mt-lg-0">
      <v-text-field outlined filled prepend-inner-icon="$vuetify.icons.search" v-model="search"
          placeholder="Search" @input="$emit('search-change', search)" class="search__input"/>
      <v-select
        prefix="Sort:"
        class="mx-2 projects__order-dropdown"
        outlined
         filled
        :items="orderChoices"
        v-model="orderChoice"
        @change="$emit('sort-change', orderChoice)"
          persistent-placeholder
      >
      </v-select>
      <v-btn
        class="mb-2 projects__createButton"
        color="primary"
        large
        elevation="0"
        :ripple="false"
        to="/create-project"
      >
        <v-icon class="ml-n2 mr-2">
          $vuetify.icons.addProject
        </v-icon>{{ $t('projects.addNewProject') }}</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({})
export default class ProjectBar extends Vue {
  orderChoice = 'az'

  search = ''

  projects = []

  get orderChoices(): Array<{[key:string]: TranslateResult}> {
    return [
      { value: 'az', text: this.$t('A-Z ascending') },
      { value: 'za', text: this.$t('A-Z descending') },
      { value: 'modificationAscending', text: this.$t('Last Update ascending') },
      { value: 'modificationDescending', text: this.$t('Last Update descending') },
    ];
  }
}
</script>
<style scoped>

</style>
