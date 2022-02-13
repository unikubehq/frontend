<template>
  <v-app-bar app color="white" elevation="5" height="75">
    <v-toolbar-title class="font-weight-medium text-capitalize">
      {{ currentRoute }}
    </v-toolbar-title>
    <div class="d-flex flex-row justify-space-around align-center" style="width: 350px;">
      <v-menu v-model="notificationsMenu" offset-y nudge-bottom="5" nudge-left="290">
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" text>
            <v-badge
              :content="notificationCount"
              :value="notificationCount"
              color="#ff5e5b"
              overlap
            >
              <v-icon width="40" height="40">
                $vuetify.icons.notificationBlue
              </v-icon>
            </v-badge>
          </v-btn>
        </template>
        <v-card width="340">
          <v-card-title>{{ $t('navigation.notifications') }}</v-card-title>
          <v-divider class="notification__divider"></v-divider>
          <div v-if="hasInvitations">
            <project-invite
              v-for="invite in userInvitationsResults"
              :invite="invite"
              :key="invite.id"
              v-on:answer-invitation="handleAnswerInvitation"
            >
            </project-invite>
          </div>
          <v-card-text v-else>{{ $t('navigation.noNotifications') }}</v-card-text>
        </v-card>
      </v-menu>

      <v-divider vertical class="ml-3"></v-divider>
      <div class="profile-dropdown">
        <v-menu v-model="menu" offset-y nudge-bottom="5">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="343d6f" v-bind="attrs" v-on="on" text :ripple="false" class="py-9">
              <v-avatar
                size="46"
                class="avatar__unikube mr-3"
                :style="avatarStyles">
                <img v-if="auth.avatarImage" :src="auth.avatarImage"
                  alt="User Avatar">
                <span v-else-if="$store.state.context.organizationMember">
                  {{ avatar.initials }}
                </span>
                <img v-else src="@/assets/img/avatar.svg" alt="Default Avatar">
              </v-avatar>
              <div class="d-flex flex-column text-left">
                <h3 class="mb-0">{{ auth.username }}</h3>
                <p class="mb-0 text-capitalize" v-if="$store.state.context.organizationMember"
                    v-text="$store.state.context.organizationMember.role" />
              </div>
              <v-icon class="ml-4" small>$vuetify.icons.dropdown</v-icon>
            </v-btn>
          </template>
            <v-card>
              <v-list nav>
                <v-list-item-group>
                  <v-list-item :ripple="false" @click="$router.push({name: 'settings.account'})">
                    <v-list-item-icon>
                      <v-icon>$vuetify.icons.accountBlue</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t('navigation.accountSettings')" />
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item :ripple="false" @click="auth.logout()">
                    <v-list-item-icon>
                      <v-icon>$vuetify.icons.logout</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="$t('navigation.logout')" />
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
        </v-menu>
      </div>
    </div>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ProjectInvite from '@/components/Notifications/ProjectInvite.vue';
import { Avatar } from '@/typing';
import Converter from '@/utils/converter';
import { TOrganizationInvitationNode, TUserInvitationsQueryResult, UserInvitationsQuery } from '@/generated/graphql';
import useAuthStore from '@/stores/auth';

export default defineComponent({
  components: {
    ProjectInvite,
  },
  apollo: {
    userInvitations: {
      query: UserInvitationsQuery,
    },
  },
  setup() {
    const userInvitations = ref({} as TUserInvitationsQueryResult['userInvitations']);
    const auth = useAuthStore();
    return {
      auth,
      userInvitations,
    };
  },
  data() {
    return {
      notificationsMenu: false,
      menu: false,
    };
  },
  methods: {
    handleAnswerInvitation(): void {
      this.$apollo.queries.userInvitations.refetch();
    },
  },
  computed: {
    userInvitationsResults(): TOrganizationInvitationNode[] {
      return this.userInvitations?.results as TOrganizationInvitationNode[] || [];
    },
    hasInvitations(): boolean {
      return !!this.userInvitations?.results?.length;
    },
    notificationCount(): number {
      return this.userInvitations?.results?.length || 0;
    },
    avatar(): Avatar {
      return Converter.memberToAvatar(this.$store.state.context.organizationMember);
    },
    currentRoute(): string {
      return this.$route?.meta?.label as string;
    },
  },
  mounted(): void {
    if (this.$route.path === '/') {
      this.$router.push({ name: 'overview' });
    }
  },
});
</script>

<style>
  .notification__divider {
    max-width: calc(100% - 32px);
    margin: auto;
  }
</style>
