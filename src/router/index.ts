import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Login from '@/views/Login.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
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
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // Todo determine loggedIn state
  const loggedIn = true;
  if (to.name !== 'Login' && !loggedIn) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router;
