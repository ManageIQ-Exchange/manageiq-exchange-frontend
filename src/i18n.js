import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { reactI18nextModule } from 'react-i18next';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    ns: ['special', 'common'],
    defaultNS: 'special',

    backend: {
      // load from i18next-gitbook repo
      loadPath:
        'https://raw.githubusercontent.com/i18next/i18next-gitbook/master/locales/{{lng}}/{{ns}}.json',
      crossDomain: true
    },
    debug: true,

    interpolation: {
      escapeValue: false
    },

    react: {
      wait: false
    }
  });


export default i18n;
