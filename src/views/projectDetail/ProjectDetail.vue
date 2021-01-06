<template>
  <v-container>
  <project-bar></project-bar>
    Project detail for {{ $route.params.slug }}
    <v-tabs vertical background-color="#f7f7f7" class="project-detail__wrapper">
      <v-tab
        class="text-left"
        height="130px"
        :to="'/project/' + project.slug"
        v-for="project in allProjects.results"
        :key="project.id"
        v-model="tab"
      >
      <v-row no-gutters>
        <v-col cols="12" class="mb-2">
          <h4 class="mb-4">{{ project.title }}</h4>
          <v-divider></v-divider>
        </v-col>
        <v-col cols="6">
          <h4>{{ project.packages.totalCount }}</h4>
          <small>No. of Applications</small>
        </v-col>
        <v-col cols="6" class="text-right">
          <h4>{{ verboseDate(project.modified) }}</h4>
          <small>No. of Applications</small>
        </v-col>
      </v-row>
      </v-tab>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container v-if="!$route.query.edit">
            <v-row>
              <v-col cols="6">
                <h2 class="mb-1">{{ project.title }}</h2>
                <small class="d-block">{{ project.description }}</small>
              </v-col>
              <v-col cols="3">
                <h4 class="mb-2">{{ verboseDate(project.created) }}</h4>
                <small class="d-block">Date added</small>
              </v-col>
              <v-col cols="3">
                <v-btn
                outlined
                plain
                color="#a1a9b2"
                width="144"
                @click="setEdit"
                >
                  <v-icon size="24">
                    $vuetify.icons.edit
                  </v-icon>
                  Edit Project
                </v-btn>
              </v-col>
            </v-row>
            <v-row align-content="flex-end">
              <v-col cols="6">
                <small><b>Last Update:</b>{{ verboseDate(project.modified) }}</small>
              </v-col>
              <v-col cols="3">
                <h4>{{ project.creator.firstName }} {{ project.creator.lastName }}</h4>
                <small class="d-block">Created by</small>
              </v-col>
              <v-col cols="3">
                <v-btn
                outlined
                plain
                color="#a1a9b2"
                width="144"
                >
                  <v-icon size="24">
                    $vuetify.icons.delete
                  </v-icon>
                  Delete Project
                </v-btn>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-tabs v-model="innerTab">
              <v-tab>
                Applications <span class="tab-count-badge"> {{ project.packages.totalCount }}</span>
              </v-tab>
              <v-tab>
                Team Members <span class="tab-count-badge"> {{ project.members.length }}</span>
              </v-tab>
              <v-tabs-items v-model="innerTab">
                <v-tab-item>
                  <v-container>
                    <v-row>
                      <v-col cols="6" v-for="pkg in project.packages.results" :key="pkg.id">
                        <v-card outlined>
                          <v-card-title>
                            <v-row>
                              <v-col cols="9">
                                {{ pkg.title }}
                              </v-col>
                              <v-col cols="3" class="text-right">
                                <v-avatar
                                  color="primary"
                                  v-for="user in project.members"
                                  :key="user.user.firstName"
                                  class="initials-avatar"
                                  size="40"
                                >
                                  <span class="project-card__avatar-initials">
                                    {{ user.user.firstName[0] }}{{ user.user.lastName[0]}}
                                  </span>
                                </v-avatar>
                              </v-col>
                              <v-divider></v-divider>
                            </v-row>
                          </v-card-title>
                          <v-card-text>
                            <v-divider class="mb-2"></v-divider>
                            <v-col cols="12">
                              <v-icon>$vuetify.icons.deployments</v-icon>
                              Deployments
                            </v-col>
                            <v-col cols="12">
                              <span
                                v-for="deployment in pkg.environments[0].deployments"
                                :key="deployment.id"
                                class="deployment-badge mr-3 px-4 py-2"
                              >
                                {{ deployment.title}}
                              </span>
                            </v-col>
                          </v-card-text>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-tab-item>
              </v-tabs-items>
            </v-tabs>
          </v-container>
          <v-container v-else>
            <create-project-view :edit-mode="true" :project="project"></create-project-view>
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>

  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectBar from '@/components/overview/ProjectBar.vue';
import CreateProjectView from '@/views/createProject/CreateProject.vue';
import { ProjectDetailQuery, ProjectDetailOtherProjectsQuery } from '@/generated/graphql';

@Component({
  components: {
    ProjectBar,
    CreateProjectView,
  },
  apollo: {
    project: {
      query: ProjectDetailQuery,
      variables() {
        return {
          slug: this.projectSlug,
        };
      },
    },
    allProjects: {
      query: ProjectDetailOtherProjectsQuery,
    },
  },
  beforeRouteUpdate(to, from, next) {
    this.$apollo.queries.allProjects.refetch();
    this.$apollo.queries.project.refresh();
    next();
  },
})
export default class ProjectDetail extends Vue {
  get projectSlug(): string {
    return this.$route.params.slug;
  }

  tab = 0;

  innerTab = 0;

  // eslint-disable-next-line class-methods-use-this
  verboseDate(date: Date): string {
    return new Date(date).toDateString();
  }

  setEdit(): void {
    this.$router.push({ query: { edit: true } });
  }
}
</script>

<style lang="scss" scoped>
.v-tabs--vertical > .v-tabs-bar .v-tab {
  height: 130px!important;
}
.project-detail__wrapper {
  box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
  border-radius: 8px;
}
.deployment-badge {
  font-weight: 500;
  background-color: #f3f4f9;
  color: #9eaed7;
}
.tab-count-badge {
  background-color: $unikube-green;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  margin-left: 8px;
  border-radius: 4px;
}
</style>
