<template>
    <v-navigation-drawer app dark width="300" :mini-variant="mini" mini-variant-width="96">
      <template slot="append">
        <v-img src="@/assets/img/navigation_background.svg"/>
        <v-list style="position:absolute; bottom: 10px; left: 0; width: 100%;">
          <v-list-item link :ripple="false" to="/help">
            <v-list-item-icon>
              <v-icon>$vuetify.icons.help</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Help</v-list-item-title>
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
                <v-img src="@/assets/img/Unikube-Logo-H-NoShadow_light.svg"
                    max-height="45" max-width="164" contain v-if="!mini"/>
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
                <img v-if="$store.state.context.organization"
                    :src="$store.state.context.organization.avatarImage">
                <img v-else src="" alt="">
              </v-list-item-avatar>

              <v-list-item-content v-if="$store.state.context.organization">
                <v-list-item-title
                    class="font-weight-bold"
                    v-if="$store.state.context.organization">
                  {{ currentOrganizationName }}
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
                <v-img :src="organization.avatarImage" max-width="35" contain/>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="organization.title"></v-list-item-title>
                <v-list-item-subtitle v-text="'ID: ' + idToVerboseId(organization.id)"/>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item link  to="/create-organization">
                <v-list-item-icon class="organization-dropdown--icon">
                  <v-icon>$vuetify.icons.createOrganization</v-icon>
                </v-list-item-icon>
              <v-list-item-title class="text--secondary">
                {{ $t('navigation.createOrganization') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon class="organization-dropdown--icon">
                  <v-icon>$vuetify.icons.joinOrganization</v-icon>
                </v-list-item-icon>
              <v-list-item-title class="text--secondary">
                {{ $t('navigation.joinOrganization') }}
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
import Vue from 'vue';
import Component from 'vue-class-component';
import { OrganizationsQuery, TOrganizationNode } from '@/generated/graphql';
import Strings from '@/utils/strings';

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteUpdate',
  'beforeRouteLeave',
]);

@Component({
  apollo: {
    allOrganizations: {
      query: OrganizationsQuery,
      result(result) {
        if (result.data.allOrganizations.results.length) {
          this.$store.commit('context/setOrganization', result.data.allOrganizations.results[0]);
        } else {
          this.$router.push({ name: 'create-organization' });
        }
      },
    },
  },
})
export default class Layout extends Vue {
  items = [
    { icon: '$vuetify.icons.overview', title: 'Overview', to: '/overview' },
    { icon: '$vuetify.icons.permission', title: 'Permissions', to: '/permissions' },
    { icon: '$vuetify.icons.activity', title: 'Activity', to: '/activities' },
    { icon: '$vuetify.icons.settings', title: 'Settings', to: '/settings' },
  ];

  mini = false;

  idToVerboseId = Strings.idToVerboseId

  toggleMini(): void {
    this.mini = !this.mini;
  }

  setOrganizationContext(organization: TOrganizationNode): void {
    this.$store.commit('context/setOrganization', organization);
    if (this.$route.name !== 'overview') {
      this.$router.push({ name: 'overview' });
    }
  }

  get currentOrganizationName(): string {
    return this.$store.state.context.organization.title;
  }
}
</script>

<style scoped>
</style>
