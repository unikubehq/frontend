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
        <v-row justify="center" align="center" class="pt-16">
          <v-col></v-col>
          <v-col justify="center" align-self="center" class="text-center">
            <v-icon size="120">
              $vuetify.icons.noProjectsFound
            </v-icon>
            <h3>{{ $t('projects.notFound') }}</h3>
            <p>
              <router-link to="/create-project"
                  v-if="$can('projects:add', $store.state.context.organization)">
                {{ $t('general.clickHere') }}
              </router-link>
              {{ $t('projects.createFirst') }}
            </p>
          </v-col>
          <v-col></v-col>
        </v-row>
      </div>
    <v-pagination
      next-icon="$vuetify.icons.dropdown"
      prev-icon="$vuetify.icons.dropdown"
      :length="listLength"
      v-model="currentPage"
      v-on:input="changeOffset($event)" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
} from 'vue';
import ProjectBar from '@/components/Projects/ProjectBar.vue';
import ProjectList from '@/components/Projects/ProjectList.vue';
import { ProjectsQuery, TProjectNode, TProjectsQueryResult } from '@/generated/graphql';
import { RouteLocationNormalized } from 'vue-router';
import setupPagination from '@/utils/pagination';
import { useQuery } from '@vue/apollo-composable';
import { useStore } from 'vuex';

const sortAscending = (a: TProjectNode, b: TProjectNode): number => {
  if (a.title.toUpperCase() < b.title.toUpperCase()) {
    return -1;
  }
  if (b.title.toUpperCase() < a.title.toUpperCase()) {
    return 1;
  }
  return 0;
};

export default defineComponent({
  name: 'ProjectTiles',
  components: {
    ProjectBar,
    ProjectList,
  },
  setup() {
    const limit = ref(10);
    const offset = ref(0);
    const variables = {
      limit: limit.value,
      offset: offset.value,
    };
    const { result, error } = useQuery(ProjectsQuery, variables);
    if (error) {
      const store = useStore();
      store.commit({
        type: 'errors/setError',
        error,
        code: 100,
        location: 'Projects.vue',
      });
    }
    const totalObjectCount = computed((): number => (result ? result.value.totalCount : 0));

    const {
      changeOffset,
      listLength,
      currentPage,
    } = setupPagination(limit.value, offset.value, totalObjectCount.value);

    return {
      totalObjectCount,
      changeOffset,
      offset,
      limit,
      listLength,
      currentPage,
      allProject: result,
    };
  },
  data() {
    return {
      sorting: 'az',
      search: '',
      allProjects: {} as TProjectsQueryResult,
    };
  },
  computed: {
    organizationId(): string {
      return this.$store.state.context.organization.id;
    },
    projectResults(): Array<TProjectNode> {
      let result = this.allProjects.allProjects?.results as TProjectNode[];
      if (result) {
        if (this.sorting === 'az') {
          result = result.slice().sort(sortAscending);
        } else {
          result = result.slice().sort(sortAscending).reverse();
        }

        if (this.search) {
          result = result.filter(
            (project: TProjectNode) => project.title.toLocaleLowerCase()
              .includes(this.search.toLocaleLowerCase()),
          );
        }

        return result.filter(
          (project: TProjectNode) => project?.organization?.id === this.organizationId,
        );
      }
      return [{} as TProjectNode];
    },
    loading(): boolean {
      return this.$apollo.queries.allProjects.loading;
    },
  },
  methods: {
    refetchProjects(): void {
      const message = this.$t('projects.deleteSuccess');
      this.$store.commit('context/addSnackbarMessage', {
        message,
        error: false,
      });
      this.$apollo.queries.allProjects.refetch();
    },
  },
  beforeRouteEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next) {
    next((vm) => {
      vm.$apollo.queries.allProjects.refetch();
    });
  },
});
</script>

<style scoped>

</style>
