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
            <v-icon size="120">$noProjectsFound</v-icon>
            <h3>{{ t('projects.notFound') }}</h3>
            <p>
              <router-link to="/create-project"
                  v-if="$can('projects:add', context.organization)">
                {{ t('general.clickHere') }}
              </router-link>
              {{ t('projects.createFirst') }}
            </p>
          </v-col>
          <v-col></v-col>
        </v-row>
      </div>
    <v-pagination
      next-icon="$dropdown"
      prev-icon="$dropdown"
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
import {
  ProjectsQuery,
  TProjectNode,
  TProjectsQueryResult,
  TProjectsQueryVariables,
} from '@/generated/graphql';
import setupPagination from '@/utils/pagination';
import { useQuery, UseQueryReturn } from '@vue/apollo-composable';
import { useI18n } from 'vue-i18n';
import useContextStore from '@/stores/context';
import useErrorStore from '@/stores/errors';

const sortAscending = (a: TProjectNode, b: TProjectNode): number => {
  if (a.title.toUpperCase() < b.title.toUpperCase()) {
    return -1;
  }
  if (b.title.toUpperCase() < a.title.toUpperCase()) {
    return 1;
  }
  return 0;
};

// eslint-disable-next-line arrow-body-style
const sortModifiedAscending = (a: TProjectNode, b: TProjectNode): number => {
  return new Date(a.currentCommitDateTime).valueOf() - new Date(b.currentCommitDateTime).valueOf();
};

// eslint-disable-next-line arrow-body-style
const sortModifiedDescending = (a: TProjectNode, b: TProjectNode): number => {
  return new Date(b.currentCommitDateTime).valueOf() - new Date(a.currentCommitDateTime).valueOf();
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
    const {
      result,
      error,
      refetch,
      loading,
    } = useQuery(
      ProjectsQuery,
      variables,
      {
        fetchPolicy: 'no-cache',
      },
    ) as UseQueryReturn<TProjectsQueryResult, TProjectsQueryVariables>;
    const errorStore = useErrorStore();
    if (error.value) {
      errorStore.setError({
        error: error.value,
        code: 100,
        location: 'Projects.vue',
      });
    }
    const totalObjectCount = computed((): number => (result.value?.allProjects?.totalCount || 0));

    const {
      changeOffset,
      listLength,
      currentPage,
    } = setupPagination(limit.value, offset.value, totalObjectCount.value);

    const { t } = useI18n({ useScope: 'global' });

    const context = useContextStore();

    return {
      context,
      t,
      totalObjectCount,
      changeOffset,
      offset,
      limit,
      listLength,
      currentPage,
      allProjects: result,
      refetchProjectsQuery: refetch,
      loading,
    };
  },
  data() {
    return {
      sorting: 'az',
      search: '',
    };
  },
  computed: {
    projectResults(): Array<TProjectNode> {
      let result = this.allProjects?.allProjects?.results as TProjectNode[];
      if (result) {
        if (this.sorting === 'az') {
          result = result.slice().sort(sortAscending);
        } else if (this.sorting === 'modificationAscending') {
          result = result.slice().sort(sortModifiedAscending);
        } else if (this.sorting === 'modificationDescending') {
          result = result.slice().sort(sortModifiedDescending);
        } else {
          result = result.slice().sort(sortAscending).reverse();
        }

        if (this.search) {
          result = result.filter(
            (project: TProjectNode) => project.title.toLocaleLowerCase()
              .includes(this.search.toLocaleLowerCase()),
          );
        }
        console.log(result);
        return result.filter(
          (project: TProjectNode) => project?.organization?.id === this.context?.organization?.id,
        );
      }
      return [{} as TProjectNode];
    },
  },
  methods: {
    refetchProjects(): void {
      const message = this.t('projects.deleteSuccess');
      this.context.addSnackbarMessage({
        message,
        error: false,
      });
      this.refetchProjectsQuery();
    },
  },
});
</script>

<style scoped>

</style>
