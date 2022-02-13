<template>
  <div class="project-card__wrapper">
    <v-row class="white pl-5 pr-10" align="center">
      <v-col cols="7" class="mt-2">
        <component
            :is="loading ? 'span' : 'router-link'"
            :to="projectUrl"
            class="mr-6 d-inline-block">
          <v-icon size="48">$project</v-icon>
        </component>
        <component
            :is="loading ? 'span' : 'router-link'"
            :to="projectUrl"
            class="d-inline-block">
          <h3 class="mb-0">
            <span v-if="loading"><v-skeleton-loader type="heading" tile/></span>
            <span v-else>
              {{ project.title}}
              <span class="project-card__role">
                {{ $can('edit', project) ? $t('general.admin') : $t('general.member') }}
              </span>
            </span>
          </h3>
          <p>{{ project.description }}</p>
        </component>
      </v-col>
      <v-col class="text-right pr-10">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <div v-on="on" v-bind="attrs" class="d-inline-block">
              <small>{{ $t('projects.projectStatus') }}:</small>
              <v-avatar size="9" class="ml-2"
                :color="getProjectStatusLevel(project.repositoryStatus)" />
            </div>
            </template>
            <span>{{ getReadableProjectStatus(project.repositoryStatus) }}</span>
        </v-tooltip>
        <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
        <cli-hint :commands="projectCliHintMessage"/>
        <div class="d-inline-block" v-if="$can('edit', project)">
          <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
          <component
              :is="loading ? 'span' : 'router-link'"
              class="project-card__edit"
              :to="editUrl"
          >
            <v-icon size="24">$edit</v-icon>
          </component>
          <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
          <v-icon class="project-card__sync" @click="syncRepo(project)" size="24">
            $sync
          </v-icon>
          <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
          <v-icon @click="deleteProjectDialog(project)" size="24" class="project-card__delete">
            $delete
          </v-icon>
        </div>
      </v-col>
    </v-row>
    <v-row class="white px-7">
      <v-divider class="mr-7"></v-divider>
      <component
          :is="loading ? 'span' : 'router-link'"
          :to="projectUrl">
        <v-icon class="project-card__detail" size="24">$dropdown</v-icon>
      </component>
    </v-row>
    <v-row justify="space-around" class="white pl-5 pt-3 pb-3 pr-10">
      <v-col>
        <h4>
          <span v-if="loading">
            <v-skeleton-loader type="heading" tile />
          </span>
          <span v-else>{{ project.currentCommit || '-' }}</span>
        </h4>
        <small>Commit</small>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <h4>
          <span v-if="loading"><v-skeleton-loader type="heading" tile width="70"/></span>
          <span v-else>{{ project.decks.length }}</span>
        </h4>
        <small>{{ $t('projects.numberDecks') }}</small>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <h4>
          <span v-if="loading"><v-skeleton-loader type="heading" tile width="70"/></span>
          <span v-else>{{ modifiedDate }}</span>
        </h4>
        <small>{{ $t('projects.lastUpdate') }}</small>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col class="text-right pr-10">
        <project-member-avatars :members="project.members" :loading="loading" />
      </v-col>
    </v-row>
    <delete-project :show="showDeleteDialog" :project="deleteProject"
        @hide="showDeleteDialog = false; deleteProject = undefined;"></delete-project>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Maybe, TProjectNode, UpdateProjectRepositoryMutation } from '@/generated/graphql';
import { CliHintMessage } from '@/typing/index';
import CliHint from '@/components/general/CliHint.vue';
import DeleteProject from '@/components/Projects/DeleteProject.vue';
import ProjectMemberAvatars from '@/components/Projects/ProjectMemberAvatars.vue';
import Converter from '@/utils/converter';

export default defineComponent({
  components: {
    CliHint,
    DeleteProject,
    ProjectMemberAvatars,
  },
  props: {
    project: {
      type: Object as PropType<TProjectNode>,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      deleteProject: null as Maybe<TProjectNode>,
      showDeleteDialog: false,
      drawer: false,
      projectCliHintMessage: [
        {
          command: 'unikube project up',
          hint: this.$t('cli.project.up'),
        },
        {
          command: 'unikube project prune',
          hint: this.$t('cli.project.prune'),
        },
      ] as CliHintMessage[],
      getReadableProjectStatus: Converter.getReadableProjectStatus,
      getProjectStatusLevel: Converter.getProjectStatusLevel,
    };
  },
  computed: {
    modifiedDate(): string {
      if (this.project?.currentCommitDateTime) {
        return this.$d(new Date(this.project?.currentCommitDateTime), 'short');
      }
      return '-';
    },
    editUrl(): string {
      return this.loading ? '' : `/project/${this.project?.id}?edit=true`;
    },
    projectUrl(): string {
      return this.loading ? '' : `/project/${this.project?.id}`;
    },
  },
  methods: {
    syncRepo(project: TProjectNode): void {
      this.$apollo.mutate({
        mutation: UpdateProjectRepositoryMutation,
        variables: {
          id: project.id,
        },
      }).then(() => {
        this.$store.commit('context/addSnackbarMessage', {
          message: this.$t('projects.sync').toString(),
          error: false,
        });
      }).catch(() => {
        this.$store.commit('context/addSnackbarMessage', {
          message: this.$t('projects.syncFail').toString(),
          error: true,
        });
      });
    },
    deleteProjectDialog(project: TProjectNode): void {
      this.deleteProject = project;
      this.showDeleteDialog = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.project-card{
  &__wrapper {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
    a {
      text-decoration: none;
      color: $unikube-blue;
    }
  }
  &__detail {
    transform: rotate(-90deg);
  }
  &__role {
    border: 2px solid $unikube-blue;
    line-height: 16px;
    height: 20px;
    border-radius: 10px;
    font-size: 12px;
    color: $unikube-blue;
    font-weight: 600;
    padding: 0 10px;
    margin-left: 18px;
    vertical-align: middle;
    margin-bottom: 2px;
    display: inline-block;
  }
}
hr {
  height: 42px;
  align-self: center;
}
</style>
