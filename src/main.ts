import { createApp } from 'vue';
import * as Sentry from '@sentry/vue';
import Keycloak from 'keycloak-js';
import KeycloakAuthorization from 'keycloak-js/dist/keycloak-authz';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { abilitiesPlugin, Can } from '@casl/vue';
import { Ability, AbilityBuilder } from '@casl/ability';
import { createVuetify } from 'vuetify';
import router from '@/router';
import App from '@/App.vue';
// import store from '@/store';
import pinia from '@/stores';
import apolloProvider from '@/vue-apollo';
import { UnikubeAbility } from '@/typing';
import i18n from '@/i18n';

console.log(`Running unikube frontend version ${process.env.VUE_APP_VERSION}`);

const keycloak = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
});
const app = createApp(App);
function initializeUnikubeApp(mode: string) {
  const spinner = document.getElementById('loading-spinner');
  if (spinner) {
    spinner.remove();
  }
  const { build } = new AbilityBuilder<UnikubeAbility>(Ability);
  const ability = build({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    detectSubjectType: (object) => object.__typename,
  }) as UnikubeAbility;

  const app = createApp(App);
  const vuetify = createVuetify();

  app.use(VueAxios, axios);
  app.use(apolloProvider);
  app.use(store);
  app.use(router);
  app.use(pinia);
  app.use(i18n);
  app.use(abilitiesPlugin, ability, { useGlobalProperties: true });
  app.component('CaslCan', Can);
  app.axios.defaults.baseURL = process.env.VUE_APP_UPLOAD_URL;
  let auth;
  if (mode !== 'e2e') {
    store.commit('auth/setKeycloakClient', keycloak);
    store.dispatch('auth/scheduleRefresh');
  }
  function vueInit() {
    app.mount('#app');
    // new Vue({
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   // eslint-disable-next-line no-underscore-dangle
    //   store: mode !== 'e2e' ? store : window.__store__,
    //   vuetify,
    //   beforeCreate() {
    //     this.$store.commit('context/initContext');
    //   },
    //   render: (h) => h(App),
    // }).$mount('#app');
  }
  if (mode === 'e2e') {
    vueInit();
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const authorization = new KeycloakAuthorization(keycloak);
    authorization.ready.then(() => {
      authorization.entitlement('gateway').then((rpt: string) => {
        store.commit('auth/setRpt', rpt);
        vueInit();
      });
    });
  }
}
if (process.env.NODE_ENV === 'e2e') {
  initializeUnikubeApp('e2e');
} else {
  keycloak.init({
    onLoad: 'login-required',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    checkLoginIframe: false,
  }).then((authenticated: boolean) => {
    if (authenticated) {
      if (process.env.NODE_ENV === 'production') {
        Sentry.init({
          app,
          dsn: process.env.VUE_APP_SENTRY_DSN,
        });
      }

      initializeUnikubeApp('other');
    } else {
      console.log('Error: not authenticated.');
    }
  }).catch((err) => {
    console.log(err);
  });
}
