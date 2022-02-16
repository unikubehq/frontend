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
            <v-list-item-avatar>
              <v-icon>$help</v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ t('navigation.help') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template slot="prepend">
        <v-list-item class="mt-2" :ripple="false">
            <v-list-item-title class="title">
              <div class="d-flex"
                  :class="{'justify-space-between': !mini, 'justify-center': mini}">
                <router-link :to="{name: 'overview'}">
                  <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg" alt="Unikube Logo"
                      max-height="45" max-width="164" contain v-if="!mini"/>
                </router-link>
                <v-btn  icon @click="toggleMini" :ripple="false">
                  <v-icon medium class="d-block mt-2">$burger</v-icon>
                </v-btn>
              </div>
            </v-list-item-title>
        </v-list-item>
        <v-list-item class="mt-5">
          <v-list-item-title class="subtitle-2 text-uppercase" v-if="!mini">
            {{ t('navigation.organization') }}
          </v-list-item-title>
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
                <v-img v-if="context.organization &&
                  context.organization.avatarImage"
                  :src="context.organization.avatarImage"
                  alt="Organization Avatar"/>
                <v-icon v-else>$defaultOrganization</v-icon>
              </v-list-item-avatar>

              <div v-if="context.organization">
                <v-list-item-title
                    class="font-weight-bold"
                    v-if="context.organization">
                  {{ context.organization.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  Organization ID: {{ idToVerboseId(context.organization.id) }}
                </v-list-item-subtitle>
              </div>
<v-icon small class="float-right organization-dropdown--arrow" v-if="!mini">$arrowDownWhite</v-icon>
            <v-icon small class="organization-dropdown--arrow" v-if="mini">$arrowDownWhite</v-icon>
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
                <v-icon v-else>$defaultOrganization</v-icon>
              </v-list-item-avatar>
              <v-list-item-title v-text="organization.title"></v-list-item-title>
              <v-list-item-subtitle v-text="'ID: ' + idToVerboseId(organization.id)"/>
            </v-list-item>
            <v-divider />
            <v-list-item link :to="{name: 'create-organization'}">
                <v-list-item-avatar class="organization-dropdown--icon">
                  <v-icon>$createOrganization</v-icon>
                </v-list-item-avatar>
              <v-list-item-title class="text--secondary">
                {{ t('navigation.createOrganization') }}
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
          <v-list-item-avatar>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import {
  OrganizationMembersQuery,
  OrganizationsQuery,
  TOrganizationMember, TOrganizationMembersQueryResult, TOrganizationMembersQueryVariables,
  TOrganizationNode, TOrganizationsQueryResult, TOrganizationsQueryVariables,
} from '@/generated/graphql';
import Strings from '@/utils/strings';
import { useI18n } from 'vue-i18n';
import useAuthStore from '@/stores/auth';
import useContextStore from '@/stores/context';
import { useQuery, UseQueryReturn } from '@vue/apollo-composable';
import { useRoute, useRouter } from 'vue-router';
import { ApolloQueryResult } from '@apollo/client';

export default defineComponent({
  name: 'NavigationSidebar',
  setup() {
    const { t } = useI18n({ useScope: 'global' });
    const auth = useAuthStore();
    const context = useContextStore();
    const route = useRoute();
    const router = useRouter();
    const items = ref([
      { icon: '$overview', title: t('views.projects'), to: '/overview' },
      { icon: '$settings', title: t('views.settingsLabel'), to: '/settings' },
    ]);

    const { result, refetch, onResult } = useQuery(
      OrganizationsQuery,
      {},
      {
        fetchPolicy: 'no-cache',
      },
    ) as UseQueryReturn<TOrganizationsQueryResult, TOrganizationsQueryVariables>;

    const r = useQuery(
      OrganizationMembersQuery,
      {
        id: context?.organization?.id,
      },
    ) as UseQueryReturn<TOrganizationMembersQueryResult, TOrganizationMembersQueryVariables>;
    r.onResult((userResult) => {
      const members = userResult?.data?.organization?.members as TOrganizationMember[];
      if (members?.length) {
        const currentMember = members.filter(
          (member: TOrganizationMember) => member?.user?.id === auth.uuid,
        )[0];
        if (currentMember) {
          context.setOrganizationMember(currentMember as TOrganizationMember);
        }
      }
    });

    const setOrganizationContext = (organization: TOrganizationNode, goToOverview = true): void => {
      context.organization = organization;
      if (route.name !== 'overview' && goToOverview) {
        router.push({ name: 'overview' });
      }
    };

    const checkAndSetOrganization = (organizations: TOrganizationNode[]): void => {
      /* Check if currently set organization is still valid. If not change context organization */
      let contained = false;
      organizations.forEach((organization: TOrganizationNode) => {
        if (context.organization?.id === organization.id) {
          contained = true;
        }
      });
      // If it is not contained within the result set - set the first.
      if (!contained && organizations.length) {
        [context.organization] = organizations;
      }
    };
    const initializeOrganization = (organizations: TOrganizationNode[]): void => {
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
      setOrganizationContext(organization, false);
    };
    onResult((queryResult: ApolloQueryResult<TOrganizationsQueryResult>) => {
      if (!queryResult?.data?.allOrganizations?.results?.length) {
        router.push({ name: 'create-organization' });
      }
      // If currently no organization is set - set the first from the result set.
      if (!context.organization) {
        initializeOrganization(
          queryResult?.data?.allOrganizations?.results as TOrganizationNode[],
        );
      } else {
      // If currently an organization is set, check if it is still contained in the result set.
        checkAndSetOrganization(
          queryResult?.data?.allOrganizations?.results as TOrganizationNode[],
        );
      }
    });

    return {
      auth,
      checkAndSetOrganization,
      initializeOrganization,
      context,
      t,
      items,
      refetchOrgas: refetch,
    };
  },
  data() {
    return {
      idToVerboseId: Strings.idToVerboseId,
      mobile: false,
    };
  },
  methods: {
    toggleMini(): void {
      this.context.setSidebarExpansion(!this.context.sidebarExpanded);
    },
  },
  computed: {
    mini(): boolean {
      return !this.context.sidebarExpanded;
    },
  },
  mounted(): void {
    this.refetchOrgas();
    this.auth.$onAction(({ name, after }) => {
      if (name === 'setRpt') {
        after(() => {
          this.refetchOrgas();
        });
      }
    });
    this.context.setSidebarExpansion(window.outerWidth > 1180);
  },
});
</script>
