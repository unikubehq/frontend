import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CreateOrganization from '@/views/Organizations/CreateOrganization.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/intro',
    name: 'create-organization',
    component: CreateOrganization,
  },
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Layout.vue'),
    children: [
      {
        path: '/overview',
        name: 'overview',
        component: () => import(/* webpackChunkName: "about" */ '../views/Projects.vue'),
      },
      {
        path: '/activities',
        name: 'activities',
        component: () => import(/* webpackChunkName: "about" */ '../views/Activities.vue'),
      },
      {
        path: '/permissions',
        name: 'permissions',
        component: () => import(/* webpackChunkName: "about" */ '../views/Permissions.vue'),
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
        redirect: { name: 'settings.account' },
        children: [
          {
            path: '/settings/account',
            name: 'settings.account',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/AccountSettings.vue'),
          },
          {
            path: '/settings/notifications',
            name: 'settings.notifications',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/NotificationSettings.vue'),
          },
          {
            path: '/settings/roles',
            name: 'settings.roles',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/OrganizationRoles.vue'),
          },
          {
            path: '/settings/organization',
            name: 'settings.organization',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/OrganizationSettings.vue'),
          },
          {
            path: '/settings/payment',
            name: 'settings.payment',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/Payment.vue'),
          },
        ],
      },
      {
        path: '/create-project',
        name: 'create New Project',
        component: () => import(/* webpackChunkName: "about" */ '../views/Projects/CreateProject.vue'),
      },
      {
        path: '/project/:slug/add-members',
        name: 'project.addMembers',
        component: () => import('../views/Projects/AddTeamMember.vue'),
      },
      {
        path: '/project/:slug',
        name: 'project.detail',
        component: () => import('../views/Projects/ProjectDetail.vue'),
        redirect: { name: 'project.detail.decks' },
        children: [
          {
            path: '/project/:slug/decks',
            name: 'project.detail.decks',
            component: () => import('../views/Projects/ProjectDetail/ProjectDecks.vue'),
          },
          {
            path: '/project/:slug/members',
            name: 'project.detail.members',
            component: () => import('../views/Projects/ProjectDetail/ProjectMembers.vue'),
          },
          {
            path: '/project/:slug/sops',
            name: 'project.detail.sops',
            component: () => import('../views/Projects/ProjectDetail/Sops.vue'),
          },
          {
            path: '/project/:slug/cluster-settings',
            name: 'project.detail.clusterSettings',
            component: () => import('../views/Projects/ProjectDetail/ClusterSettings.vue'),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
