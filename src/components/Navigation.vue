<template>
    <v-navigation-drawer
        app
        theme="dark"
        width="300"
        :rail="mini"
        mini-variant-width="96"
        mobile-breakpoint="0"
        :disable-resize-watcher="true"
    >
      <template v-slot:append>
        <v-img src="@/assets/img/navigation_background.svg" alt="Navigation Background"/>
        <v-list style="position:absolute; bottom: 10px; left: 0; width: 100%;"
            class="navigation-list">
          <v-list-item href="https://unikube.io/help/" target="_blank" prepend-icon="$help">
            <v-list-item-title>{{ t('navigation.help') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </template>
      <template v-slot:prepend>
        <v-list-item class="mt-2">
          <v-list-item-header>
            <v-list-item-title class="title">
              <router-link :to="{name: 'overview'}">
                <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg" alt="Unikube Logo"
                    height="45" width="164" v-if="!mini"/>
              </router-link>
            </v-list-item-title>
          </v-list-item-header>
          <template v-slot:append>
            <v-btn @click="toggleMini"
                class="navigation-toggle" width="21" variant="text" icon="$burger"/>
          </template>
        </v-list-item>
        <v-list-item class="mt-5">
          <v-list-item-title class="text-uppercase" v-if="!mini">
            {{ t('navigation.organization') }}
          </v-list-item-title>
        </v-list-item>
        <v-menu
            offset-y
            content-class="organization-dropdown"
            rounded="0"
            transition="fab"
            :close-on-content-click="true"
        >
          <template v-slot:activator="{ props }">
            <v-list-item class="mt-2 organization-dropdown--item" two-line
                v-bind="getDropdownAttributes(context.organisation, props)"
                :class="{'flex-wrap': mini, 'justify-center': mini}">

              <v-list-item-header v-if="context.organization && !mini">
                <v-list-item-title
                    class="font-weight-bold"
                    v-if="context.organization">
                  {{ context.organization.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  ID: {{ idToVerboseId(context.organization.id) }}
                </v-list-item-subtitle>
              </v-list-item-header>
              <template v-slot:append>
                <v-list-item-avatar right v-if="!mini">
                  <v-btn variant="text" icon="$arrowDownWhite"></v-btn>
                </v-list-item-avatar>
              </template>
            <v-icon small class="organization-dropdown--arrow" v-if="mini">$arrowDownWhite</v-icon>
            </v-list-item>
          </template>
          <div class="organization-dropdown--notch"></div>
          <v-list theme="light" rounded>
            <v-list-item
                v-for="organization in allOrganizations"
                :key="organization.id"
                two-line
                @click="setOrganizationContext(organization)"
                v-bind="getDropdownAttributes(organization, {})"
            >
              <v-list-item-header>
                <v-list-item-title v-text="organization.title"></v-list-item-title>
                <v-list-item-subtitle v-text="'ID: ' + idToVerboseId(organization.id)"/>
              </v-list-item-header>
            </v-list-item>
            <v-divider />
            <v-list-item :to="{name: 'create-organization'}" prepend-icon="$createOrganization">
              <v-list-item-title class="text--secondary">
                {{ t('navigation.createOrganization') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-list class="navigation-list">
        <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            :prepend-icon="item.icon"
            :rounded="0"
            class="navigation-item"
            active-class="navigation-item--is-active"
        >
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
    const allOrganizations = ref([] as TOrganizationNode[]);

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
      allOrganizations.value = (
          queryResult?.data?.allOrganizations?.results || []
      ) as TOrganizationNode[];
      console.log(allOrganizations);
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
      allOrganizations,
      checkAndSetOrganization,
      initializeOrganization,
      setOrganizationContext,
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
    getDropdownAttributes(organization: TOrganizationNode, attrs: any) {
      const result = {} as any;
      if (organization?.avatarImage) {
        result['prepend-avatar'] = organization.avatarImage;
      } else {
        result['prepend-icon'] = '$defaultOrganization';
      }
      return {
        ...attrs,
        ...result,
      };
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

<style lang="scss">
@import "@/styles/_ci";
.v-navigation-drawer__headline {
  background-color: $unikube-blue;
}

.v-navigation-drawer {
   background-image: linear-gradient(18deg, #0e132e -13%, #252e65 64%);
}
.v-navigation-drawer {
  .v-list-item {
    padding-left: 20px;
    width: 100%;
    .v-list-item-title {
      width: 100%;
    }
  }
}
.v-navigation-drawer--mini-variant {
  .v-list-item.navigation-item {
    padding-left: 16px;
  }
  .v-list-item.navigation-item--is-active {
    padding-left: 12px;
  }
  .v-list-item > .organization-dropdown--arrow:not(:first-child) {
    float: none !important;
    width: 100% !important;
    clip: unset !important;
    position: relative !important;
    height: 0;
    text-align: center;
  }
  .organization-dropdown--item {
    &:after {
      margin-top: -48px;
    }
  }
}
</style>
