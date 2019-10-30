import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import translationEN from './locales/en/translation.json';
import translationAR from './locales/ar/translation.json';
import translationEG from './locales/eg/translation.json';
import LngDetector from 'i18next-browser-languagedetector';

// the translations
const resources = {
  EN: {
    translation: translationEN
  },
  EG: {
    translation: translationEG
  },
  AR: {
    translation: translationAR
  }
};

i18n
  .use(LngDetector)
  .use(reactI18nextModule) // passes i18n down to react-i18next
  .init({
    whitelist: ['AR', 'EN', 'EG'],
    resources,
    fallbackLng: "EG", // use en if detected lng is not available
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });



export default i18n;