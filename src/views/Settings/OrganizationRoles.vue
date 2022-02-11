<template>
  <div class="py-5">
      <h2>{{ $t('settings.roles.title') }}</h2>
      <p class="text--secondary">{{ $t('settings.roles.intro') }}</p>
      <v-divider></v-divider>
    <v-row>
      <v-col cols="10" class="mt-8">
        <h3 class="font-weight-medium mb-5">
          <v-icon size="40" class="mr-3">$vuetify.icons.existingMembers</v-icon>
          {{ $t('settings.roles.existing') }}
        </h3>
        <v-simple-table class="table__unikube">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" colspan="2" scope="col">{{ $t('settings.roles.name') }}</th>
              <th class="text-left" scope="col">{{ $t('settings.roles.role') }}</th>
              <th class="text-left" colspan="2" v-if="isOrganizationAdmin" scope="col">
                {{ $t('settings.roles.actions') }}
              </th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="member in members" :key="member.user.id">
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
                <td class="text-capitalize">{{ member.role }}</td>
                <td v-if="isOrganizationAdmin">
                  <v-icon size="24" @click="deleteMember = member; showDeleteDialog = true;">
                    $vuetify.icons.delete
                  </v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-alert
            dense
            outlined
            class="mt-5"
            icon="$vuetify.icons.warning"
            v-for="error in memberErrors"
            :key="error"
            type="error">{{ error }}</v-alert>
      </v-col>
      <v-col cols="8" class="mt-1">
        <h3 class="font-weight-medium mb-5">
          <v-icon size="40" class="mr-3">$vuetify.icons.addMember</v-icon>
          {{ $t('settings.roles.invite') }}
        </h3>
        <v-form>
          <v-row no-gutters>
            <v-col cols="8">
              <v-text-field
                :label="$t('general.email')"
                name="email"
                filled
                outlined
                type="text"
                :placeholder="$t('settings.account.enterEmail')"
                v-model="email"
                @blur="$v.email.$touch()"
                prepend-inner-icon="$vuetify.icons.email"
                persistent-placeholder
              />
            </v-col>
          </v-row>
          <div class="mb-5 mt-n5">
            <small class="text--secondary">
              <strong>Admin:</strong> Full access to all aspects of the organization.
              Admins can add/remove new projects, add/remove members, edit organization
              settings and add new roles.
            </small>
          </div>
          <v-btn color="primary" :disabled="$v.$invalid" large elevation="0"
              :ripple="false" @click="inviteEmail" :loading="inviteLoading">
            Invite new member
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="6">
        <h4 class="font-weight-medium mb-5">
          {{ $t('settings.roles.pendingInvites') }}
        </h4>
        <v-simple-table class="table__unikube"
            v-if="allOrganizationInvitations &&
            allOrganizationInvitations.results.length && isOrganizationAdmin">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" colspan="2" scope="col">
                Email
              </th>
              <th class="text-left" colspan="2" scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="invite in allOrganizationInvitations.results" :key="invite.id">
                <td>
                  {{ invite.email }}
                </td>
                <td>
                  <v-icon size="24" @click="revokeInvite(invite.id)">$vuetify.icons.delete</v-icon>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <div v-else-if="allOrganizationInvitations &&
          !allOrganizationInvitations.results.length">
          No pending invitations.
        </div>
      </v-col>
    </v-row>
    <delete-organization-member
        v-if="showDeleteDialog"
        :member-name="deleteMember.user.givenName + ' ' + deleteMember.user.familyName"
        :show="showDeleteDialog"
        @delete="removeMember(deleteMember); showDeleteDialog = false;"
        @hide="showDeleteDialog = false;"
    />
  </div>
</template>

<script lang="ts">
import { email, required } from '@vuelidate/validators';
import {
  DeleteOrganizationMember,
  InviteToOrganization,
  OrganizationMembersQuery,
  TOrganizationMember,
  OrganizationInvites, RevokeOrganizationInvite, TOrganizationNode, Maybe,
} from '@/generated/graphql';
import UnikubeAvatar from '@/components/general/Avatar.vue';
import Converter from '@/utils/converter';
import DeleteOrganizationMemberComponent from '@/components/Settings/DeleteOrganizationMember.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  apollo: {
    organization: {
      query: OrganizationMembersQuery,
      variables() {
        return {
          id: this.$store.state.context.organization.id,
        };
      },
      skip(): boolean {
        return !this.organizationSet;
      },
    },
    allOrganizationInvitations: {
      query: OrganizationInvites,
      variables() {
        return {
          id: this.$store.state.context.organization.id,
        };
      },
      skip(): boolean {
        return !this.organizationSet;
      },
    },
  },
  validations: {
    email: {
      email,
      required,
    },
  },
  data() {
    return {
      dataChanged: false,
      email: '',
      inviteLoading: false,
      memberErrors: [] as string[],
      organization: {} as TOrganizationNode,
      memberToAvatar: Converter.memberToAvatar,
      dialog: false,
      showDeleteDialog: false,
      deleteMember: {} as TOrganizationMember,
    };
  },
  computed: {
    isOrganizationAdmin(): boolean {
      return this.$store.state.context.organization && this.$can('edit', this.$store.state.context.organization);
    },

    organizationSet(): boolean {
      return !!this.$store.state.context.organization;
    },

    members(): TOrganizationMember[] {
      const memberIds: Array<string> = [];
      if (this.organization?.members) {
        return (this.organization?.members || []).filter((member: Maybe<TOrganizationMember>) => {
          if (!member || !member.user) {
            return false;
          }
          const included = memberIds.includes(member.user.id);
          memberIds.push(member.user.id);
          return !included;
        }) as TOrganizationMember[] || [];
      }
      return [];
    },
  },

  methods: {
    setDataChanged(): void {
      this.dataChanged = true;
    },
    removeMember(member: TOrganizationMember): void {
      if (!member.user) {
        return;
      }
      this.$apollo.mutate({
        mutation: DeleteOrganizationMember,
        variables: {
          id: member.user.id,
        },
      }).then(() => {
        this.$apollo.queries.organization.refetch();
      }).catch((error) => {
        this.memberErrors = [error.message];
      });
    },
    inviteEmail(): void {
      this.inviteLoading = true;
      this.$apollo.mutate({
        mutation: InviteToOrganization,
        variables: {
          email: this.email,
          organization: this.$store.state.context.organization.id,
        },
      }).then(() => {
        this.email = '';
        this.inviteLoading = false;
        this.$apollo.queries.allOrganizationInvitations.refetch();
      }).catch((err) => {
        this.inviteLoading = false;
        this.$store.commit('context/addSnackbarMessage', {
          message: err,
          error: true,
        });
      });
    },
    revokeInvite(id: string): void {
      this.$apollo.mutate({
        mutation: RevokeOrganizationInvite,
        variables: {
          inviteId: id,
        },
      }).then(() => {
        this.$apollo.queries.allOrganizationInvitations.refetch();
      });
    },
  },

  components: {
    DeleteOrganizationMember: DeleteOrganizationMemberComponent,
    UnikubeAvatar,
  },
});
</script>
