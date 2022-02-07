import Vue from 'vue';
import VueI18n from 'vue-i18n';
import LocaleMessages = VueI18n.LocaleMessages;

Vue.use(VueI18n);

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

export default VueI18n.createI18n<[MessageSchema], 'de' | 'en'>({
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
