<template>
  <v-container fluid >
    <h1 class="text-h1 mt-5" :class="overlay ? 'ml-3' : ''" v-if="project">
      {{ $t('projects.addMembers') }} - {{ project.title }}
    </h1>
    <v-card>
    <v-row>
      <v-card-text class="px-10">
        <v-col cols="7">
          <div class="text--secondary">
            Add team members from your organization to the project.
            You can change their member role from later.
          </div>
        </v-col>
        <v-col cols="12">
        <v-form class="my-n5" v-for="(member, idx) in members" :key="idx">
          <v-row>
            <v-col :cols="overlay ? 6 : 5">
              <v-select
                label="Member"
                :items="['Guy1', 'Guy2']"
                v-model="member.user"
                outlined
                prepend-inner-icon="$vuetify.icons.organization"
                :placeholder="$t('project.chooseMember')"
              ></v-select>
            </v-col>
            <v-col :cols="overlay ? 6 : 5">
              <v-select
                :label="$t('project.role')"
                v-model="member.role"
                :items="['Admin', 'Member']"
                outlined
                prepend-inner-icon="$vuetify.icons.organization"
                :placeholder="$t('projects.selectRole')"
              ></v-select>
            </v-col>
            <v-col cols="2" class="mt-7" v-if="idx !== 0">
              <v-btn color="error" large @click="removeMemberForm(idx)">Remove</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-btn :ripple="false" plain elevation="0" @click="addMemberForm" text
                class="mt-2 mt-n5">
              <v-icon size="24" class="mr-2">
              $vuetify.icons.addRound
              </v-icon>{{ $t('user.addAnother') }}
            </v-btn>
          </v-col>
          <v-col :cols="overlay ? 5 : 2">
            <v-btn
              color="primary"
              block
              large
              @click="$emit('done')"
              :disabled="!allMembersValid"
            >{{ $tc('project.addMember', members.length) }}</v-btn>
          </v-col>
        </v-row>
      </v-col>
      </v-card-text>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ProjectDetailQuery, TProjectDetailQueryResult, TProjectNode } from '@/generated/graphql';
import { email } from 'vuelidate/lib/validators';

@Component({
  validations: {
    email,
  },
  apollo: {
    graphqlProject: {
      query: ProjectDetailQuery,
      variables() {
        return {
          id: this.$route.params.slug,
        };
      },
      update(data: TProjectDetailQueryResult) {
        this.project = data.project;
      },
    },
  },
})
export default class AddTeamMember extends Vue {
  @Prop() readonly projectProp: TProjectNode | undefined

  @Prop() readonly overlay: boolean = false

  email = '';

  project: TProjectNode | null = null;

  members = [
    { user: null, role: null },
  ]

  addMemberForm(): void {
    this.members.push({ user: null, role: null });
  }

  removeMemberForm(idx: number): void {
    Vue.delete(
      this.members,
      idx,
    );
  }

  get allMembersValid(): boolean {
    return this.members.every((member) => member.user && member.role);
  }

  created(): void {
    if (this.projectProp) {
      this.project = this.projectProp;
    }
  }
}
</script>

<style scoped>
</style>
