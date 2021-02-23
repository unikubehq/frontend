<template>
  <v-row>
    <v-col class="d-flex align-center">
      <h3>Projects List</h3>
    </v-col>
    <v-col class="d-flex flex-row align-center justify-space-between">
      <v-text-field
        class="ma-2"
        filled
        outlined
        prepend-inner-icon="$vuetify.icons.search"
        placeholder="Search"
      ></v-text-field>
      <v-select
        class="ma-2"
        filled
        outlined
        :items="orderChoices"
        v-model="orderChoice"
      >
        <template v-slot:selection>
          Sort: {{ orderChoice }}
        </template>
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
        </v-icon>
        Add new Project
      </v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class ProjectBar extends Vue {
  orderChoices = ['Foo', 'Fizz', 'Buzz']

  orderChoice = 'Foo'

  projects = []
}
</script>
<style scoped>

</style>
