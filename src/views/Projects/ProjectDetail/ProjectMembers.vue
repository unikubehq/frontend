<template>
  <div>
    <v-simple-table class="table__unikube">
      <template v-slot:default>
        <thead class="member-thead">
        <tr>
          <th class="text-left" colspan="2">{{ $t('user.name') }}</th>
          <th class="text-left">{{ $t('user.role') }}</th>
          <th class="text-left">{{ $t('user.lastOnline') }}</th>
          <th class="text-left" colspan="2">{{ $t('user.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="member in project.members" :key="member.id" class="mb-3">
          <td>
            <div class="d-flex">
              <unikube-avatar :avatar="memberToAvatar(member)"/>
              <div class="d-flex flex-column ml-4">
                <h3 class="mb-0">
                  {{ member.user.givenName }} {{ member.user.familyName }}
                </h3>
                <p class="mb-0">{{ member.user.email }}</p>
              </div>
            </div>
          </td>
          <td class="text-capitalize">{{ member.role }}</td>
          <td>{{ member.user.lastLogin }}</td>
          <td>
            <v-icon size="24">$vuetify.icons.edit</v-icon>
            <v-divider style="height: 24px; min-height: auto;" class="mx-4 mb-n1" vertical />
            <v-icon size="24" @click="removeMember(member)">$vuetify.icons.delete</v-icon>
          </td>
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
            ></v-select>
          </td>
          <td>
            <v-btn plain color="transparent" class="pa-0" elevation="0"
                @click="removePendingMember(idx)" :ripple="false">
              <v-icon size="24">$vuetify.icons.cross</v-icon>
            </v-btn>
            <v-btn color="neutral" dark @click="addMember(idx)" :ripple="false" elevation="0"
                :loading="pendingMember.loading">
              Save
            </v-btn>
          </td>
        </tr>
        <tr>
          <td colspan="4">
            <v-btn :ripple="false" plain elevation="0"
                @click="pendingMembers.push({user: null, role: null, loading: false})"
                color="transparent" class="mt-2 pa-0">
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
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  CreateProjectMemberMutation,
  Maybe, OrganizationMembersQuery,
  TOrganizationMember, TProjectMember, TProjectMemberRoleEnum,
  TProjectNode,
} from '@/generated/graphql';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import RemoveMember from '@/components/Projects/RemoveMember.vue';
import Converter from '@/utils/converter';
import VueI18n from 'vue-i18n';
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
export default class ProjectPackages extends Vue {
  @Prop() readonly project!: TProjectNode;

  memberToAvatar = Converter.memberToAvatar;

  memberToDelete : TProjectMember | null = null

  showDeleteDialog = false

  pendingMembers: Array<{user: string, role: string, loading: boolean}> = []

  get memberChoices(): Array<{value: string, text: string}> {
    const result : Array<{value: string, text: string}> = [];
    const members = [...this.$data?.organization?.members];
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
}
</script>

<style lang="scss" scoped>
.table__unikube {
  border: 1px solid #c4ccd4;
  border-radius: 7px;
  overflow: hidden;
  ::v-deep table {
    border-collapse: separate;
    width: 101%;
  }
  tbody {
    tr:before,
    tr:after {
      display: inline-block;
      content: '';
    }
    tr:before {
      width: 15px;
    }
    tr:after {
      width: 20px;
    }
  }
  .member-thead {
    background-color: #9eaed7;

    th {
      padding-top: 11px !important;
      padding-bottom: 10px !important;
      font-size: 14px;
      font-weight: 500;
    }

    th:first-child {
      padding-left: 5%;
    }
  }
  td:first-child {
    padding-left: calc(5% - 15px) !important;
  }
  td:last-child {
    padding-right: calc(5% - 15px) !important;
  }
  td {
    padding-top: 24px !important;
    padding-bottom: 24px !important;
  }
}

.theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
  color: white;
}
</style>
