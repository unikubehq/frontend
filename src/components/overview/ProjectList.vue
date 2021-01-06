<template>
  <div class="project-card__wrapper">
    <v-row v-if="!project" :justify="'center'" :align="'center'" class="pt-16">
      <v-col></v-col>
      <v-col :justify="'center'" :align-self="'center'" class="text-center">
        <v-icon size="120">
          $vuetify.icons.noProjectsFound
        </v-icon>
        <h3>No Projects Found</h3>
        <p>
          <router-link to="/">Click Here</router-link>
          to create your first project
        </p>
      </v-col>
      <v-col></v-col>
    </v-row>
    <div v-else>
        <v-row class="white px-5" align="center">
          <v-col cols="1">
            <v-icon size="48">$vuetify.icons.project</v-icon>
          </v-col>
          <v-col cols="9" class="mt-2">
            <h3 class="mb-0">{{ project.title}}</h3>
            <p>{{ project.description }}</p>
          </v-col>
          <v-col class="text-right">
            <v-icon size="24">$vuetify.icons.edit</v-icon>
            <v-divider style="height: 24px" class="mx-4" vertical></v-divider>
            <v-icon @click="deleteProject(project.id)" size="24">$vuetify.icons.delete</v-icon>
          </v-col>
        </v-row>
        <v-row class="white">
          <v-divider class="px-5"></v-divider>
          <router-link to="/">
            <v-icon class="project-card__detail" size="24">$vuetify.icons.dropdown</v-icon>
          </router-link>
        </v-row>
        <v-row justify="space-around" class="white px-5 pt-3 pb-3">
          <v-col>
            <h4>{{ project.currentCommit }}</h4>
            <small>Commit</small>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <h4>{{ project.packages.resultCount }}</h4>
            <small>No. of Applications</small>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col>
            <h4>{{ modifiedDate }}</h4>
            <small>Last Update</small>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="text-right">
            <v-avatar color="primary" v-for="initials in avatarInitials" :key="initials">
<!--              <img v-if="user.avatar" :src="user.avatar">-->
              <span class="project-card__avatar-initials">{{ initials }}</span>
            </v-avatar>
          </v-col>
        </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TProjectNode, DeleteProject } from '@/generated/graphql';

@Component()
export default class ProjectList extends Vue {
  @Prop(TProjectNode) readonly project: TProjectNode | undefined

  drawer = false;

  get modifiedDate(): Date {
    return new Date(this.project.modified).toDateString();
  }

  get avatarInitials(): Array {
    const initials = [];
    this.project.members.map((x) => initials.push(x.user.firstName[0] + x.user.lastName[0]));
    return initials;
  }

  deleteProject(id: number): void {
    this.$apollo.mutate({
      mutation: DeleteProject,
      variables: {
        id,
      },
    })
      .then((data) => {
        console.log(data);
        if (data.data.deleteProject.ok) {
          this.$emit('deletion');
        }
      })
      .catch((err) => console.log(err));
  }
}
</script>

<style lang="scss" scoped>
.v-avatar {
  border: 3px solid white !important;
  &:not(:first-child) {
    margin-left: -1em;
  }
}
.project-card{
  &__wrapper {
    box-shadow: 0 2px 40px 0 rgba(183, 183, 183, 0.15);
  }
  &__avatar-initials {
    color: $green-light-5;
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
