<template>
  <v-container fluid class="px-8">
    <project-bar @sort-change="sorting = $event"></project-bar>
        <div v-for="project in projectResults" :key="project.id">
          <v-skeleton-loader
            type="card-avatar, article"
            v-if="loading"
          ></v-skeleton-loader>
          <project-list
            :project="project"
            v-on:deletion="refetchProjects"
            class="mb-5"
            v-else
          ></project-list>
      </div>
    <v-pagination
      :length="listLength"
      v-model="currentPage"
      v-on:input="changeOffset($event)"
    >
    </v-pagination>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      top
      right
    >
      Successfully deleted.

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script lang="ts">
import ProjectBar from '@/components/overview/ProjectBar.vue';
import ProjectList from '@/components/overview/ProjectList.vue';
import { Component } from 'vue-property-decorator';
import { ProjectsQuery, TProjectNode } from '@/generated/graphql';
import { paginationMixin } from '@/components/mixins';
import { mixins } from 'vue-class-component';
import { Route } from 'vue-router';

const sortAscending = (a: TProjectNode, b: TProjectNode): number => {
  if (a.title.toUpperCase() < b.title.toUpperCase()) {
    return -1;
  }
  if (b.title.toUpperCase() < a.title.toUpperCase()) {
    return 1;
  }
  return 0;
};
const sortDescending = (a: TProjectNode, b: TProjectNode): number => {
  if (a.title.toUpperCase() < b.title.toUpperCase()) {
    return 1;
  }
  if (b.title.toUpperCase() < a.title.toUpperCase()) {
    return -1;
  }
  return 0;
};

Component.registerHooks([
  'beforeRouteUpdate',
]);

@Component({
  components: {
    ProjectBar,
    ProjectList,
  },
  apollo: {
    allProjects: {
      query: ProjectsQuery,
      variables() {
        return {
          // limit: this.limit,
          // offset: this.offset,
        };
      },
    },
  },
})
export default class Overview extends mixins(paginationMixin) {
  snackbar = false;

  sorting = 'az';

  get projectResults(): Array<TProjectNode> {
    let result = this.$data.allProjects?.results;
    if (result) {
      if (this.sorting === 'az') {
        result = result.slice().sort(sortAscending);
      } else {
        result = result.slice().sort(sortDescending);
      }
      return result;
    }
    return [];
  }

  get loading(): boolean {
    return this.$data.$apolloData.queries.allProjects.loading;
  }

  refetchProjects():void {
    this.snackbar = true;
    this.$apollo.queries.allProjects.refetch();
  }

  // eslint-disable-next-line
  beforeRouteEnter(to: Route, from: Route, next: (a: any) => void): void {
    console.log(this);
    next((vm: this) => {
      vm.$apollo.queries.allProjects.refetch();
    });
  }
}
</script>

<style scoped>

</style>
