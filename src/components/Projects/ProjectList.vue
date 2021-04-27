<template>
  <div class="project-card__wrapper">
    <v-row class="white pl-5 pr-10" align="center">
      <v-col cols="1">
        <v-icon size="48">$vuetify.icons.project</v-icon>
      </v-col>
      <v-col cols="9" class="mt-2">
        <h3 class="mb-0">
          <span v-if="loading"><v-skeleton-loader type="heading" tile/></span>
          <span v-else>{{ project.title}}</span>
        </h3>
        <p>{{ project.description }}</p>
      </v-col>
      <v-col class="text-right pr-10" v-if="$can('edit', project)">
        <router-link :to="'/project/' + project.id + '?edit=true'">
          <v-icon size="24">$vuetify.icons.edit</v-icon>
        </router-link>
        <v-divider style="height: 24px" class="mx-4" vertical></v-divider>
        <v-icon @click="deleteProjectDialog(project)" size="24">$vuetify.icons.delete</v-icon>
      </v-col>
    </v-row>
    <v-row class="white px-7">
      <v-divider class="mr-7"></v-divider>
      <router-link :to="'/project/' + project.id ">
        <v-icon class="project-card__detail" size="24">$vuetify.icons.dropdown</v-icon>
      </router-link>
    </v-row>
    <v-row justify="space-around" class="white pl-5 pt-3 pb-3 pr-10">
      <v-col>
        <h4>
          <span v-if="loading"><v-skeleton-loader type="heading" tile/></span>
          <span v-else v-text="project.currentCommit || '-'"></span>
        </h4>
        <small>Commit</small>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col>
        <h4>
          <span v-if="loading"><v-skeleton-loader type="heading" tile width="70"/></span>
          <span v-else>{{ project.packages.length }}</span>
        </h4>
        <small>{{ $t('projects.numberPackages') }}</small>
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
        <span v-if="loading">
          <v-skeleton-loader type="avatar" class="d-inline-block ml-n2"/>
          <v-skeleton-loader type="avatar" class="d-inline-block ml-n2"/>
          <v-skeleton-loader type="avatar" class="d-inline-block ml-n2"/>
        </span>
        <span v-else>
          <v-avatar
            size="46"
            class="initials-avatar avatar-list-item"
            color="primary"
            v-for="initials in avatarInitials"
            :key="initials"
          >
  <!--              <img v-if="user.avatar" :src="user.avatar">-->
            <span class="avatar-initials">{{ initials }}</span>
          </v-avatar>
        </span>
      </v-col>
    </v-row>
    <delete-project :show="showDeleteDialog" :project="deleteProject"
        @hide="showDeleteDialog = false; deleteProject = undefined;"></delete-project>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TProjectNode } from '@/generated/graphql';
import DeleteProject from '@/components/Projects/DeleteProject.vue';

@Component({
  components: { DeleteProject },
})
export default class ProjectList extends Vue {
  @Prop() readonly project: TProjectNode | undefined

  @Prop({ default: false }) readonly loading!: boolean

  deleteProject: TProjectNode | null = null

  showDeleteDialog = false

  drawer = false;

  get modifiedDate(): string {
    return this.$d(new Date(this.project?.currentCommitDateTime), 'short');
  }

  // eslint-disable-next-line class-methods-use-this
  get avatarInitials(): Array<string> {
    return ['MS', 'RS', 'TF'];
    // eslint-disable-next-line max-len
    // this.project.members.map((x: {[key: string]: {[key: string]: string}}) => initials.push(x.user.firstName[0] + x.user.lastName[0]));
    // return initials;
  }

  deleteProjectDialog(project: TProjectNode): void {
    this.deleteProject = project;
    this.showDeleteDialog = true;
  }
}
</script>

<style lang="scss" scoped>
.project-card{
  &__wrapper {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
  }
  &__detail {
    transform: rotate(-90deg);
  }
}
hr {
  height: 42px;
  align-self: center;
}
</style>
