<template>
  <div>
    <project-bar @sort-change="sorting = $event" @search-change="search = $event"></project-bar>
      <div v-if="projectResults.length">
        <div v-for="project in projectResults" :key="project.id">
          <project-list
            :project="project"
            v-on:deletion="refetchProjects"
            class="mb-5"
            :loading="loading"
          ></project-list>
        </div>
      </div>
      <div v-else>
        <v-row :justify="'center'" :align="'center'" class="pt-16">
          <v-col></v-col>
          <v-col :justify="'center'" :align-self="'center'" class="text-center">
            <v-icon size="120">
              $vuetify.icons.noProjectsFound
            </v-icon>
            <h3>{{ $t('projects.notFound') }}</h3>
            <p>
              <router-link to="/">{{ $t('general.clickHere') }}</router-link>
              {{ $t('projects.createFirst') }}
            </p>
          </v-col>
          <v-col></v-col>
        </v-row>
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
    >{{ $t('projects.deleteSuccess') }}<template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >{{ $t('general.close') }}</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import ProjectBar from '@/components/Projects/ProjectBar.vue';
import ProjectList from '@/components/Projects/ProjectList.vue';
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

  search = '';

  get projectResults(): Array<TProjectNode> {
    let result = this.$data.allProjects?.results;
    if (result) {
      if (this.sorting === 'az') {
        result = result.slice().sort(sortAscending);
      } else {
        result = result.slice().sort(sortDescending);
      }

      if (this.search) {
        result = result.filter(
          (project: TProjectNode) => project.title.toLocaleLowerCase()
            .includes(this.search.toLocaleLowerCase()),
        );
      }

      return result;
    }
    return [{} as TProjectNode];
  }

  get loading(): boolean {
    return this.$apollo.queries.allProjects.loading;
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
