import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CreateOrganization from '@/views/organization/CreateOrganization.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/create-organization',
    name: 'Create Organization',
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
        component: () => import(/* webpackChunkName: "about" */ '../views/Overview.vue'),
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
        component: () => import(/* webpackChunkName: "about" */ '../views/Settings.vue'),
      },
      {
        path: '/create-project',
        name: 'create New Project',
        component: () => import(/* webpackChunkName: "about" */ '../views/createProject/CreateProject.vue'),
      },
      {
        path: '/create-project/add-members',
        name: 'Create New Project',
        component: () => import('../views/createProject/AddTeamMember.vue'),
      },
      {
        path: '/project/:slug',
        name: 'Project Detail',
        component: () => import('../views/projectDetail/ProjectDetail.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});
//
// router.beforeEach((to, from, next) => {
//   // Todo determine loggedIn state
//   const loggedIn = true;
//   if (to.name !== 'Login' && !loggedIn) {
//     next({ name: 'Login' });
//   } else {
//     next();
//   }
// });

export default router;
