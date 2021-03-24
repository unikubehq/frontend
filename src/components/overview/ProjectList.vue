<template>
  <div class="project-card__wrapper">
    <v-row class="white pl-5 pr-10" align="center">
      <v-col cols="1">
        <v-icon size="48">$vuetify.icons.project</v-icon>
      </v-col>
      <v-col cols="9" class="mt-2">
        <h3 class="mb-0">{{ project.title}}</h3>
        <p>{{ project.description }}</p>
      </v-col>
      <v-col class="text-right pr-10">
        <router-link :to="'/project/' + project.id + '?edit=true'">
          <v-icon size="24">$vuetify.icons.edit</v-icon>
        </router-link>
        <v-divider style="height: 24px" class="mx-4" vertical></v-divider>
        <v-icon @click="deleteProject(project.id)" size="24">$vuetify.icons.delete</v-icon>
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
      <v-col class="text-right pr-10">
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
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TProjectNode, DeleteProject } from '@/generated/graphql';

@Component({})
export default class ProjectList extends Vue {
  @Prop() readonly project: TProjectNode | undefined

  drawer = false;

  get modifiedDate(): string {
    return new Date(this.project?.created).toDateString();
  }

  // eslint-disable-next-line class-methods-use-this
  get avatarInitials(): Array<string> {
    return ['MS', 'RS', 'TF'];
    // eslint-disable-next-line max-len
    // this.project.members.map((x: {[key: string]: {[key: string]: string}}) => initials.push(x.user.firstName[0] + x.user.lastName[0]));
    // return initials;
  }

  deleteProject(id: number): void {
    this.$apollo.mutate({
      mutation: DeleteProject,
      variables: {
        id,
      },
    })
      .then((data) => {
        if (data.data.deleteProject.ok) {
          this.$emit('deletion');
        }
      })
      .catch((err) => console.log(err));
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
