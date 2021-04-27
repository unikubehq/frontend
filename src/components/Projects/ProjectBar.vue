<template>
  <v-row>
    <v-col class="d-flex align-center">
      <h2 style="font-weight: 500;">{{ $t('projects.projectList') }}</h2>
    </v-col>
    <v-col class="d-flex flex-row align-center justify-space-between">
      <v-text-field outlined filled prepend-inner-icon="$vuetify.icons.search" v-model="search"
          placeholder="Search" @input="$emit('search-change', search)"></v-text-field>
      <v-select
        prefix="Sort:"
        class="mx-2"
        outlined
         filled
        :items="orderChoices"
        v-model="orderChoice"
        @change="$emit('sort-change', orderChoice)"
      >
      </v-select>
      <v-btn
        class="mb-2"
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
    ];
  }
}
</script>
<style scoped>

</style>
