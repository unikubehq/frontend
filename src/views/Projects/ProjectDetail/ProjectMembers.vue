<template>
  <div>
    <v-simple-table class="table__unikube">
      <template v-slot:default>
        <thead>
        <tr>
          <th scope="col" class="text-left" colspan="2">{{ $t('user.name') }}</th>
          <th scope="col" class="text-left">{{ $t('user.role') }}</th>
          <th scope="col" class="text-left">{{ $t('user.lastOnline') }}</th>
          <th scope="col" class="text-left" colspan="2" v-if="$can('edit', project)">
            {{ $t('user.actions') }}
          </th>
          <th scope="col" class="text-left" colspan="2" v-else></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="member in membersEdit" :key="member.id" class="mb-3"
            :disabled="disabledRow(member)">
          <td>
            <div class="d-flex">
              <unikube-avatar :avatar-prop="memberToAvatar(member)"/>
              <div class="d-flex flex-column ml-4">
                <h3 class="mb-0">
                  {{ member.user.givenName }} {{ member.user.familyName }}
                </h3>
                <p class="mb-0">{{ member.user.email }}</p>
              </div>
            </div>
          </td>
          <td class="text-capitalize" v-if="!member.editing">{{ member.role }}</td>
          <td colspan="2" v-else>
            <v-select
              v-model="member.role"
              :items="projectMemberRoles"
              outlined
              :placeholder="$t('projects.selectRole')"
                style="width: 200px;"
              class="v-select__small"
                persistent-placeholder
            ></v-select>
          </td>
          <td v-if="!member.editing">{{ member.user.lastLogin }}</td>
          <td v-if="$can('edit', project)">
            <div v-if="!member.editing">
              <v-icon size="24" @click="member.editing = true;">$vuetify.icons.edit</v-icon>
              <v-divider style="height: 24px; min-height: auto;" class="mx-4 mb-n1" vertical />
              <v-icon size="24" @click="removeMember(member)">$vuetify.icons.delete</v-icon>
            </div>
            <div v-else>
              <v-icon size="24" @click="member.editing = false;" class="mr-5">
                $vuetify.icons.cross
              </v-icon>
              <v-btn color="primary" dark @click="updateMember(member)" :ripple="false"
                  elevation="0" :loading="member.loading">
                {{ $t('general.save') }}
              </v-btn>
            </div>
          </td>
          <td v-else></td>
        </tr>
        <tr v-for="(pendingMember, idx) in pendingMembers" :key="idx">
          <td>
            <v-select
                :items="memberChoices"
                v-model="pendingMember.user"
                outlined
                :placeholder="$t('project.chooseMember')"
                class="v-select__small"
                style="width: 300px;"
                persistent-placeholder
              ></v-select>
          </td>
          <td colspan="2">
            <v-select
              v-model="pendingMember.role"
              :items="projectMemberRoles"
              outlined
              :placeholder="$t('projects.selectRole')"
                style="width: 200px;"
              class="v-select__small"
                persistent-placeholder
            ></v-select>
          </td>
          <td>
            <v-btn color="transparent" class="pa-0" elevation="0"
                @click="removePendingMember(idx)" :ripple="false">
              <v-icon size="24">$vuetify.icons.cross</v-icon>
            </v-btn>
            <v-btn color="primary" dark @click="addMember(idx)" :ripple="false" elevation="0"
                :loading="pendingMember.loading">
              {{ $t('general.save') }}
            </v-btn>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <v-btn :ripple="false" color="transparent" elevation="0"
                @click="pendingMembers.push({user: null, role: null, loading: false})"
                class="mt-2 pa-0">
              <v-icon size="24" class="mr-2">
                $vuetify.icons.addRound
              </v-icon>{{ $t('user.addAnother') }}
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <remove-member :show="showDeleteDialog" :project="project"
        @hide="showDeleteDialog = false; memberToDelete = undefined;"
        :member="memberToDelete"
        @removed="$emit('update')"></remove-member>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
} from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import {
  CreateProjectMemberMutation,
  Maybe, OrganizationMembersQuery,
  TOrganizationMember, TProjectMember, TProjectMemberRoleEnum,
  TProjectNode,
} from '@/generated/graphql';
import { TProjectMemberEdit } from '@/typing';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import RemoveMember from '@/components/Projects/RemoveMember.vue';
import Converter from '@/utils/converter';
import TranslateResult = VueI18n.TranslateResult;

@Component({
  components: {
    UnikubeAvatar,
    RemoveMember,
  },
  apollo: {
    organization: {
      query: OrganizationMembersQuery,
      variables() {
        return {
          id: this.$store.state.context.organization.id,
        };
      },
      deep: true,
    },
  },
})
export default class ProjectMembers extends Vue {
  @Prop() readonly project!: TProjectNode;

  memberToAvatar = Converter.memberToAvatar;

  memberToDelete : TProjectMember | null = null

  membersEdit: Maybe<TProjectMemberEdit[]> = []

  showDeleteDialog = false

  pendingMembers: Array<{user: string, role: string, loading: boolean}> = []

  translateMembers(): void {
    if (this.project?.members?.length) {
      this.membersEdit = this.project?.members?.map(
        (member: Maybe<TProjectMember>): TProjectMemberEdit => {
          const editMember: TProjectMemberEdit = { ...member } as TProjectMemberEdit;
          editMember.editing = false;
          editMember.loading = false;
          return editMember;
        },
      );
    } else {
      this.membersEdit = [];
    }
  }

  disabledRow(member: TProjectMemberEdit): boolean {
    if (this.membersEdit?.length) {
      const editIDs = this.membersEdit.map(
        (editMember: TProjectMemberEdit) => (editMember.editing ? editMember.user?.id : null),
      );
      if (editIDs.some((flag: boolean) => flag !== null)) {
        return !editIDs.includes(member.user?.id);
      }
      return false;
    }
    return false;
  }

  get memberChoices(): Array<{value: string, text: string}> {
    const result : Array<{value: string, text: string}> = [];
    const members = this.$data?.organization?.members || [];
    members?.forEach((member: TOrganizationMember) => {
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

  updateMember(editMember: TProjectMemberEdit): void {
    if (this.project?.members?.length) {
      const member = this.project?.members?.find((projectMember: Maybe<TProjectMember>) => {
        if (projectMember) {
          return projectMember.user?.id === editMember.user?.id;
        }
        return false;
      });
      if (member) {
        this.$apollo.mutate({
          mutation: CreateProjectMemberMutation,
          variables: {
            user: member.user?.id,
            role: editMember.role,
            id: this.project.id,
          },
        }).then(() => {
          this.$emit('update');
        });
      }
    }
  }

  addMember(idx: number): void {
    this.pendingMembers[idx].loading = true;
    this.$apollo.mutate({
      mutation: CreateProjectMemberMutation,
      variables: {
        user: this.pendingMembers[idx].user,
        role: this.pendingMembers[idx].role,
        id: this.project.id,
      },
    }).then(() => {
      this.$emit('update');
      Vue.delete(
        this.pendingMembers,
        idx,
      );
    });
  }

  removeMember(member: TProjectMember): void {
    this.memberToDelete = member;
    this.showDeleteDialog = true;
  }

  removePendingMember(idx: number): void {
    Vue.delete(
      this.pendingMembers,
      idx,
    );
  }

  created(): void {
    this.translateMembers();
  }

  @Watch('project')
  projectChanged(): void {
    this.translateMembers();
  }
}
</script>

<style lang="scss" scoped>
</style>
