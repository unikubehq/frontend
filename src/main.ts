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
import apolloProvider from '@/vue-apollo';
import LocaleMessages = VueI18n.LocaleMessages;

Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(VueI18n);
Vue.use(Vuelidate);

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

const i18n = new VueI18n({
  locale: 'de',
  fallbackLocale: 'en',
  messages: loadLocaleMessages(),
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  apolloProvider,
  render: (h) => h(App),
}).$mount('#app');
