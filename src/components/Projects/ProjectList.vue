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
        <v-divider style="height: 24px" class="mx-4 mb-n1" vertical></v-divider>
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
            <v-menu
              open-on-hover
              top
              offset-y
              v-for="avatar in avatars"
              :key="avatar.key"
            >
              <template v-slot:activator="{ on }">
                <v-avatar
                  v-on="on"
                  size="46"
                  class="initials-avatar avatar-list-item avatar__unikube"
                  color="primary"
                >
                      <img v-if="avatar.image" :src="avatar.image">
                      <span v-else class="avatar-initials">{{ avatar.initials }}</span>
                </v-avatar>
              </template>

              <div class="pa-1 white">
                <v-list>
                  <v-list-item two-line>
                   <v-list-item-avatar>
                    <v-avatar
                      size="46"
                      class="avatar__unikube"
                      color="primary"
                    >
                      <img v-if="avatar.image" :src="avatar.image">
                      <span v-else>{{ avatar.initials }}</span>
                    </v-avatar>
                   </v-list-item-avatar>
                    <v-list-item-content style="max-width: 160px;">
                      <v-list-item-title>{{ avatar.name }}</v-list-item-title>
                      <v-list-item-subtitle v-if="avatar.email">
                        {{ avatar.email }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-list class="mt-n5">
                  <v-list-item two-line v-if="avatar.role">
                    <v-list-item-content>
                      <v-list-item-title style="text-transform: capitalize;">
                        {{ avatar.role }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Role
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-menu>
        </span>
      </v-col>
    </v-row>
    <delete-project :show="showDeleteDialog" :project="deleteProject"
        @hide="showDeleteDialog = false; deleteProject = undefined;"></delete-project>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Maybe, TProjectMember, TProjectNode } from '@/generated/graphql';
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

  get avatars(): Array<{ image: string | null, key: string, initials: string | null }> {
    const result: Array<{ image: string | null, key: string, initials: string | null }> = [];
    this.project?.members?.forEach((member: Maybe<TProjectMember>) => {
      const res = {
        key: member?.user?.id || '',
        image: member?.user?.avatarImage || null,
        initials: `${member?.user?.givenName?.[0]}${member?.user?.familyName?.[0]}`,
        name: `${member?.user?.givenName} ${member?.user?.familyName}` || null,
        email: `${member?.user?.email}` || null,
        role: `${member?.role}` || null,
      };
      result.push(res);
    });
    return result;
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
