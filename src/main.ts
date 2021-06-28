import Vue from 'vue';
import VueApollo from 'vue-apollo';
import Vuelidate from 'vuelidate';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Keycloak from 'keycloak-js';
import KeycloakAuthorization from 'keycloak-js/dist/keycloak-authz';
import router from '@/router';
import App from '@/App.vue';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import setupApolloProvider from '@/vue-apollo';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { abilitiesPlugin, Can } from '@casl/vue';
import { Ability, AbilityBuilder } from '@casl/ability';
import { UnikubeAbility } from '@/typing';
import i18n from '@/i18n';

console.log(`Running unikube frontend version ${process.env.VUE_APP_VERSION}`);

const keycloak = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
});

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

  Vue.config.productionTip = false;
  Vue.use(VueAxios, axios);
  Vue.use(VueApollo);
  Vue.use(Vuelidate);
  Vue.use(abilitiesPlugin, ability);
  Vue.component('Can', Can);
  Vue.axios.defaults.baseURL = process.env.VUE_APP_UPLOAD_URL;
  let auth;
  if (mode !== 'e2e') {
    store.commit('auth/setKeycloakClient', keycloak);
    store.dispatch('auth/scheduleRefresh');
  }
  function vueInit() {
    const apolloProvider = setupApolloProvider();
    new Vue({
      router,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      store: mode !== 'e2e' ? store : window.__store__,
      vuetify,
      i18n,
      apolloProvider,
      beforeCreate() {
        this.$store.commit('context/initContext');
      },
      render: (h) => h(App),
    }).$mount('#app');
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
          dsn: process.env.VUE_APP_SENTRY_DSN,
          integrations: [
            new Integrations.Vue({
              Vue,
              attachProps: true,
            }),
          ],
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
