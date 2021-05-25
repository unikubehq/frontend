import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Keycloak from 'keycloak-js';
import KeycloakAuthorization from 'keycloak-js/dist/keycloak-authz';
import router from '@/router';
import App from '@/App.vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import setupApolloProvider from '@/vue-apollo';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { abilitiesPlugin, Can } from '@casl/vue';
import { Ability, AbilityBuilder } from '@casl/ability';
import { UnikubeAbility } from '@/typing';
import { getModule } from 'vuex-module-decorators';
import Auth from '@/store/modules/auth';

import LocaleMessages = VueI18n.LocaleMessages;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
let store = store;

const keycloak = Keycloak({
  url: process.env.VUE_APP_KEYCLOAK_URL,
  realm: process.env.VUE_APP_KEYCLOAK_REALM,
  clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
});

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  const messages: LocaleMessages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

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
  Vue.use(VueI18n);
  Vue.use(Vuelidate);
  Vue.use(abilitiesPlugin, ability);
  Vue.component('Can', Can);
  Vue.axios.defaults.baseURL = process.env.VUE_APP_UPLOAD_URL;

  const i18n = new VueI18n({
    locale: 'de',
    fallbackLocale: 'en',
    messages: loadLocaleMessages(),
    dateTimeFormats: {
      en: {
        short: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        },
      },
    },
  });
  if (mode === 'e2e') {
    console.log(store);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    store = window.__store__;
  } else {
    store.commit('auth/setKeycloakClient', keycloak);
    const auth = getModule(Auth, store);
    auth.scheduleRefresh();
  }
  function vueInit() {
    const apolloProvider = setupApolloProvider();
    new Vue({
      router,
      store,
      vuetify,
      i18n,
      apolloProvider,
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
          dsn: 'https://c373b22b8d5c41678f9f577f1800933c@sentry.blueshoe.de/43',
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
