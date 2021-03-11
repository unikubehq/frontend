import Vue from 'vue';
import VueApollo from 'vue-apollo';
import VueI18n from 'vue-i18n';
import Vuelidate from 'vuelidate';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import router from '@/router';
import App from '@/App.vue';
import store from '@/store';
import vuetify from '@/plugins/vuetify';
import setupApolloProvider from '@/vue-apollo';
import axios from 'axios';
import VueAxios from 'vue-axios';
import LocaleMessages = VueI18n.LocaleMessages;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const keycloak = new Keycloak({
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

keycloak.init({
  onLoad: 'login-required',
}).then((authenticated: boolean) => {
  if (authenticated) {
    const spinner = document.getElementById('loading-spinner');
    if (spinner) {
      spinner.remove();
    }
    Vue.config.productionTip = false;
    Vue.use(VueAxios, axios);
    Vue.use(VueApollo);
    Vue.use(VueI18n);
    Vue.use(Vuelidate);
    Vue.axios.defaults.baseURL = process.env.VUE_APP_UPLOAD_URL;

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

    const i18n = new VueI18n({
      locale: 'de',
      fallbackLocale: 'en',
      messages: loadLocaleMessages(),
    });

    store.commit('auth/setKeycloakClient', keycloak);
    store.dispatch('auth/scheduleRefresh');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const authorization = new KeycloakAuthorization(keycloak);
    authorization.ready.then(() => {
      authorization.entitlement('gateway').then((rpt: string) => {
        store.commit('auth/setRpt', rpt);
        const apolloProvider = setupApolloProvider();
        new Vue({
          router,
          store,
          vuetify,
          i18n,
          apolloProvider,
          render: (h) => h(App),
        }).$mount('#app');
      });
    });
  } else {
    console.log('Error: not authenticated.');
  }
});
