<template>
    <v-navigation-drawer
        app
        dark
        width="300"
        :mini-variant="mini"
        mini-variant-width="96"
        mobile-breakpoint="0"
        :disable-resize-watcher="true"
    >
      <template slot="append">
        <v-img src="@/assets/img/navigation_background.svg" alt="Navigation Background"/>
        <v-list style="position:absolute; bottom: 10px; left: 0; width: 100%;">
          <v-list-item link :ripple="false" href="https://unikube.io/help/" target="_blank">
            <v-list-item-icon>
              <v-icon>$vuetify.icons.help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t('navigation.help') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
      <template slot="prepend">
        <v-list-item class="mt-2" :ripple="false">
          <v-list-item-content>
            <v-list-item-title class="title">
              <div class="d-flex"
                  :class="{'justify-space-between': !mini, 'justify-center': mini}">
                <router-link :to="{name: 'overview'}">
                  <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg" alt="Unikube Logo"
                      max-height="45" max-width="164" contain v-if="!mini"/>
                </router-link>
                <v-btn  icon @click="toggleMini" :ripple="false">
                  <v-icon medium class="d-block mt-2">
                    $vuetify.icons.burger
                  </v-icon>
                </v-btn>
              </div>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="mt-5">
          <v-list-item-content>
            <v-list-item-title class="subtitle-2 text-uppercase" v-if="!mini">
              {{ $t('navigation.organization') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-menu
            offset-y
            content-class="organization-dropdown"
            rounded="0"
        >
          <template v-slot:activator="{ attrs, on }">
            <v-list-item class="mt-2 organization-dropdown--item" two-line v-bind="attrs" v-on="on"
                :ripple="false"
                :class="{'flex-wrap': mini}">
              <v-list-item-avatar>
                <v-img v-if="$store.state.context.organization &&
                  $store.state.context.organization.avatarImage"
                  :src="$store.state.context.organization.avatarImage"
                  alt="Organization Avatar"/>
                <v-icon v-else>$vuetify.icons.defaultOrganization</v-icon>
              </v-list-item-avatar>

              <v-list-item-content v-if="$store.state.context.organization">
                <v-list-item-title
                    class="font-weight-bold"
                    v-if="$store.state.context.organization">
                  {{ $store.state.context.organization.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Organization ID: {{ idToVerboseId($store.state.context.organization.id) }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-icon small class="float-right organization-dropdown--arrow" v-if="!mini">
                $vuetify.icons.arrowDownWhite
              </v-icon>
              <v-icon small class="organization-dropdown--arrow" v-if="mini">
                $vuetify.icons.arrowDownWhite
              </v-icon>
            </v-list-item>
          </template>
          <div class="organization-dropdown--notch"></div>
          <v-list v-if="allOrganizations">
            <v-list-item
                v-for="organization in allOrganizations.results"
                :key="organization.id"
                link
                :ripple="false"
                two-line
                @click="setOrganizationContext(organization)"
            >
              <v-list-item-avatar class="organization-dropdown--icon">
                <v-img :src="organization.avatarImage" max-width="35" contain
                alt="Organization Avatar" v-if="organization.avatarImage"/>
                <v-icon v-else>$vuetify.icons.defaultOrganization</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="organization.title"></v-list-item-title>
                <v-list-item-subtitle v-text="'ID: ' + idToVerboseId(organization.id)"/>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item link :to="{name: 'create-organization'}">
                <v-list-item-icon class="organization-dropdown--icon">
                  <v-icon>$vuetify.icons.createOrganization</v-icon>
                </v-list-item-icon>
              <v-list-item-title class="text--secondary">
                {{ $t('navigation.createOrganization') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-list>
        <v-list-item :ripple="false"
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            link
            class="navigation-item"
            active-class="navigation-item--is-active"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FetchResult } from '@apollo/client';
import {
  OrganizationMembersQuery,
  OrganizationsQuery,
  TOrganizationMember,
  TOrganizationNode, TOrganizationsQueryResult,
} from '@/generated/graphql';
import Strings from '@/utils/strings';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'NavigationSidebar',
  apollo: {
    allOrganizations: {
      query: OrganizationsQuery,
      fetchPolicy: 'no-cache',
      result(result: FetchResult<TOrganizationsQueryResult>) {
        if (result?.data?.allOrganizations?.results?.length) {
          // If currently no organization is set - set the first from the result set.
          if (!this.$store.state.context.organization) {
            this.initializeOrganization(
              result.data?.allOrganizations.results as TOrganizationNode[],
            );
          } else {
          // If currently an organization is set, check if it is still contained in the result set.
            this.checkAndSetOrganization(
              result.data.allOrganizations.results as TOrganizationNode[],
            );
          }
        } else if (this.$route.name !== 'create-organization') {
          this.$router.push({ name: 'create-organization' });
        }
      },
    },
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    return {
      $t: t,
    };
  },
  data() {
    return {
      items: [
        { icon: '$vuetify.icons.overview', title: this.$t('views.projects'), to: '/overview' },
        { icon: '$vuetify.icons.settings', title: this.$t('views.settingsLabel'), to: '/settings' },
      ],
      idToVerboseId: Strings.idToVerboseId,
      mobile: false,
    };
  },
  methods: {
    toggleMini(): void {
      this.$store.commit('context/setSidebarExpansion', !this.$store.state.context.sidebarExpanded);
    },
    checkAndSetOrganization(organizations: TOrganizationNode[]): void {
      /* Check if currently set organization is still valid. If not change context organization */
      let contained = false;
      organizations.forEach((organization: TOrganizationNode) => {
        if (this.$store.state.context.organization.id === organization.id) {
          contained = true;
        }
      });
      // If it is not contained within the result set - set the first.
      if (!contained) {
        this.$store.commit('context/setOrganization', organizations[0]);
      } else if (!this.$store.state.context.organizationMember) {
        this.setOrganizationMember(organizations[0]);
      }
    },
    initializeOrganization(organizations: TOrganizationNode[]): void {
      /* Initialize organization context.
       *
       * Currently no organization is set. Initialize from localstorage or use first organization
       * from query result.
       */
      const contextOrganizationId = JSON.parse(localStorage.getItem('contextOrganization') || 'null');
      // If organization id was stored in localstorage, set it, when present in query result.
      let organization = organizations[0];
      if (contextOrganizationId) {
        const organizationFiltered = organizations.filter(
          (fOrganization: TOrganizationNode) => fOrganization.id === contextOrganizationId,
        );
        if (organizationFiltered.length) {
          [organization] = organizationFiltered;
        }
      }
      this.setOrganizationContext(organization, false);
    },
    setOrganizationContext(organization: TOrganizationNode, goToOverview = true): void {
      this.$store.commit('context/setOrganization', organization);
      this.setOrganizationMember(organization);
      if (this.$route.name !== 'overview' && goToOverview) {
        this.$router.push({ name: 'overview' });
      }
    },
    setOrganizationMember(organization: TOrganizationNode): void {
      this.$apollo.query({
        query: OrganizationMembersQuery,
        variables: {
          id: organization.id,
        },
      }).then((res) => {
        const currentMember = res.data.organization.members.filter(
          (member: TOrganizationMember) => member?.user?.id === this.$store.state.auth.uuid,
        )[0];
        this.$store.commit(
          'context/setOrganizationMember',
          currentMember,
        );
      });
    },
  },
  computed: {
    mini(): boolean {
      return !this.$store.state.context.sidebarExpanded;
    },
  },
  mounted(): void {
    this.$apollo.queries.allOrganizations.refetch();
    this.$store.subscribe((mutation: any) => {
      if (mutation.type === 'auth/setRpt') {
        this.$apollo.queries.allOrganizations.refetch();
      }
    });
    this.$store.commit('context/setSidebarExpansion', window.outerWidth > 1180);
  },
});
</script>
