import de from '@/locales/de.json';
import en from '@/locales/en.json';
import VueI18n from 'vue-i18n';

type GermanSchema = typeof de;
type EnglishSchema = typeof en;

export default VueI18n.createI18n<[GermanSchema, EnglishSchema], 'de' | 'en'>({
  locale: 'de',
  fallbackLocale: 'en',
  messages: {
    de,
    en,
  },
  datetimeFormats: {
    de: {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
    en: {
      short: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
    },
  },
});
