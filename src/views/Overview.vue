<template>
  <v-container>
    <project-bar></project-bar>
        <div v-for="project in allProjects.results" :key="project.title">
          <v-skeleton-loader
            type="card-avatar, article"
            v-if="$apolloData.queries.allProjects.loading"
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
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsQuery } from '@/generated/graphql';

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
          limit: this.limit,
          offset: this.offset,
        };
      },
    },
  },
})
export default class Overview extends Vue {
  currentPage = 1;

  limit = 3;

  offset = 0;

  snackbar = false;

  changeOffset(page: number): void {
    this.offset = page > 1 ? (page - 1) * this.limit : 0;
  }

  get listLength(): number {
    return Math.ceil(this.$data.allProjects.totalCount / this.limit);
  }

  refetchProjects():void {
    this.snackbar = true;
    this.$apollo.queries.allProjects.refetch();
  }

  beforeRouteEnter(to, from, next): any {
    console.log(this);
    next((vm) => {
      vm.$apollo.queries.allProjects.refetch();
    });
  }
}
</script>

<style scoped>

</style>
