<template>
  <v-container>
    <project-bar></project-bar>
        <div v-for="project in allProjects.results" :key="project.title">
          <project-list
            :project="project"
            v-on:deletion="refetchProjects"
            class="mb-5"
          ></project-list>
      </div>
    <v-pagination
      :length="listLength"
      v-model="currentPage"
      v-on:input="changeOffset($event)"
    >
    </v-pagination>
  </v-container>
</template>

<script lang="ts">
import ProjectBar from '@/components/overview/ProjectBar.vue';
import ProjectList from '@/components/overview/ProjectList.vue';
import { Component, Vue } from 'vue-property-decorator';
import { ProjectsQuery } from '@/generated/graphql';

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

  changeOffset(page: number): void {
    this.offset = page > 1 ? (page - 1) * this.limit : 0;
  }

  get listLength(): number {
    return Math.ceil(this.$data.allProjects.totalCount / this.limit);
  }

  refetchProjects():void {
    this.$apollo.queries.allProjects.refetch();
  }
}
</script>

<style scoped>

</style>
