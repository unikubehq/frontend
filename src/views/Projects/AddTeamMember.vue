<template>
  <v-container fluid >
    <v-skeleton-loader type="heading" tile height="50" class="mb-2 mt-5"
      v-if="$apollo.queries.graphqlProject.loading || $apollo.queries.organization.loading"/>
    <h1 class="text-h1 mt-5" :class="overlay ? 'ml-3' : ''" v-else>
      {{ $t('projects.addMembers') }} - {{ project.title }}
    </h1>
    <v-card>
    <v-row>
      <v-card-text class="px-10"
          v-if="$apollo.queries.graphqlProject.loading || $apollo.queries.organization.loading">
        <v-skeleton-loader type="text" tile width="50%"/>
        <v-row class="mt-3">
          <v-col cols="6"><v-skeleton-loader height="40" type="heading" tile width="90%"/></v-col>
          <v-col cols="6"><v-skeleton-loader height="40" type="heading" tile width="90%"/></v-col>
        </v-row>
        <v-skeleton-loader type="button" tile class="mt-4"/>
      </v-card-text>
      <v-card-text class="px-10" v-else>
        <v-col :cols="overlay ? 12 : 7">
          <v-alert
            dense
            outlined
            icon="$vuetify.icons.warning"
            type="error"
            v-if="memberChoices.length === 0">
            Looks like all your organization members are already part of this project!
          </v-alert>
          <div class="text--secondary">
            Add team members from your organization to the project.
            You can change their member role from later.
          </div>
        </v-col>
        <v-col cols="12">
        <v-form class="my-n5" v-for="(member, idx) in members" :key="idx">
          <v-row v-if="member.user || memberChoices.length">
            <v-col :cols="overlay ? 6 : 5">
              <v-select
                label="Member"
                :items="memberChoices"
                v-model="member.user"
                outlined
                prepend-inner-icon="$vuetify.icons.organization"
                :placeholder="$t('project.chooseMember')"
                  persistent-placeholder
              ></v-select>
            </v-col>
            <v-col :cols="overlay ? 6 : 5">
              <v-select
                :label="$t('project.role')"
                v-model="member.role"
                :items="projectMemberRoles"
                outlined
                prepend-inner-icon="$vuetify.icons.organization"
                :placeholder="$t('projects.selectRole')"
                  persistent-placeholder
              ></v-select>
            </v-col>
            <v-col :cols="overlay ? 3 : 2"
                :class="overlay ? 'mt-n10 mb-6' : 'mt-7'" v-if="idx !== 0">
              <v-btn color="error" large @click="removeMemberForm(idx)">Remove</v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-row>
          <v-col cols="12">
            <v-btn :ripple="false" color="transparent" elevation="0" @click="addMemberForm" text
                :class="overlay ? 'mt-5' : 'mt-n5'" v-if="memberChoices.length">
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
              @click="submit"
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
import {
  CreateProjectMemberMutation,
  Maybe,
  OrganizationMembersQuery,
  ProjectDetailQuery,
  TOrganizationMember,
  TProjectDetailQueryResult,
  TProjectMember,
  TProjectMemberRoleEnum,
  TProjectNode,
} from '@/generated/graphql';
import { email } from 'vuelidate/lib/validators';
import VueI18n from 'vue-i18n';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  validations: {
    email,
  },
  apollo: {
    organization: {
      query: OrganizationMembersQuery,
      variables() {
        return {
          id: this.$store.state.context.organization.id,
        };
      },
      skip() {
        return !this.organizationSet;
      },
    },
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

  @Prop({ default: false }) readonly overlay!: boolean

  email = '';

  project: TProjectNode | null = null;

  members = [
    { user: null, role: TProjectMemberRoleEnum.Member },
  ]

  get memberChoices(): Array<{value: string, text: string}> {
    const result : Array<{value: string, text: string}> = [];
    this.$data?.organization?.members?.forEach((member: TOrganizationMember) => {
      if (!this.project?.members?.every(
        (projectMember: Maybe<TProjectMember>) => projectMember?.user?.id !== member?.user?.id,
      )) {
        return;
      }
      if (member && member?.user) {
        const name = member.user?.familyName || member.user?.givenName
          ? `${member.user?.givenName} ${member.user?.familyName}` : member.user.id;
        result.push({
          value: member.user.id,
          text: name,
        });
      }
    });
    return result;
  }

  get projectMemberRoles(): Array<{value: string, text: TranslateResult}> {
    return [
      { value: TProjectMemberRoleEnum.Admin, text: this.$t('general.admin') },
      { value: TProjectMemberRoleEnum.Member, text: this.$t('general.member') },
    ];
  }

  get organizationSet(): boolean {
    return !!this.$store.state.context.organization;
  }

  addMemberForm(): void {
    this.members.push({ user: null, role: TProjectMemberRoleEnum.Member });
  }

  removeMemberForm(idx: number): void {
    Vue.delete(
      this.members,
      idx,
    );
  }

  submit(): void {
    this.members.forEach((member) => {
      if (member.user && this.project) {
        this.$apollo.mutate({
          mutation: CreateProjectMemberMutation,
          variables: {
            user: member.user,
            role: member.role,
            id: this.project.id,
          },
        });
      }
    });
    if (this.overlay) {
      this.$emit('done');
    } else {
      this.$router.push({ name: 'overview' });
    }
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
