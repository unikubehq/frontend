import * as Sentry from '@sentry/vue';
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router';
import i18n from '@/i18n';
import CreateOrganization from '@/views/Organizations/CreateOrganization.vue';

const routes: RouteRecordRaw[] = [
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
        meta: {
          label: i18n.global.t('views.projects'),
        },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import(/* webpackChunkName: "settings" */ '../views/Settings.vue'),
        meta: {
          label: i18n.global.t('views.settingsLabel'),
        },
        redirect: { name: 'settings.account' },
        children: [
          {
            path: '/settings/account',
            name: 'settings.account',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/AccountSettings.vue'),
            meta: {
              label: i18n.global.t('views.settings.account'),
            },
          },
          {
            path: '/settings/notifications',
            name: 'settings.notifications',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/NotificationSettings.vue'),
            meta: {
              label: i18n.global.t('views.settings.notifications'),
            },
          },
          {
            path: '/settings/roles',
            name: 'settings.roles',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/OrganizationRoles.vue'),
            meta: {
              label: i18n.global.t('views.settings.roles'),
            },
          },
          {
            path: '/settings/organization',
            name: 'settings.organization',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/OrganizationSettings.vue'),
            meta: {
              label: i18n.global.t('views.settings.organization'),
            },
          },
          {
            path: '/settings/payment',
            name: 'settings.payment',
            component: () => import(/* webpackChunkName: "settings" */ '../views/Settings/Payment.vue'),
            meta: {
              label: i18n.global.t('views.settings.payment'),
            },
          },
        ],
      },
      {
        path: '/create-project',
        name: 'create New Project',
        component: () => import(/* webpackChunkName: "about" */ '../views/Projects/CreateProject.vue'),
        meta: {
          label: i18n.global.t('views.createProject'),
        },
      },
      {
        path: '/project/:slug/add-members',
        name: 'project.addMembers',
        component: () => import('../views/Projects/AddTeamMember.vue'),
        meta: {
          label: i18n.global.t('views.addMembers'),
        },
      },
      {
        path: '/project/:slug',
        name: 'project.detail',
        component: () => import('../views/Projects/ProjectDetail.vue'),
        meta: {
          label: i18n.global.t('views.project.detail'),
        },
        redirect: { name: 'project.detail.decks' },
        children: [
          {
            path: '/project/:slug/decks',
            name: 'project.detail.decks',
            component: () => import('../views/Projects/ProjectDetail/ProjectDecks.vue'),
            meta: {
              label: i18n.global.t('views.project.decks'),
            },
          },
          {
            path: '/project/:slug/members',
            name: 'project.detail.members',
            component: () => import('../views/Projects/ProjectDetail/ProjectMembers.vue'),
            meta: {
              label: i18n.global.t('views.project.members'),
            },
          },
          {
            path: '/project/:slug/sops',
            name: 'project.detail.sops',
            component: () => import('../views/Projects/ProjectDetail/Sops.vue'),
            meta: {
              label: i18n.global.t('views.project.sops'),
            },
          },
          {
            path: '/project/:slug/cluster-settings',
            name: 'project.detail.clusterSettings',
            component: () => import('../views/Projects/ProjectDetail/ClusterSettings.vue'),
            meta: {
              label: i18n.global.t('views.project.clusterSettings'),
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const label = to?.meta?.label as string;
  if (label) {
    document.title = `${label} | Unikube`;
    Sentry.configureScope((scope) => scope.setTransactionName(label));
  } else {
    document.title = 'Unikube';
  }
  next();
});

export default router;
