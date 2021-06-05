import React from 'react';
import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next, Translation } from 'react-i18next';
import { LANGUAGE } from 'config/values';

const fallbackLng = 'en';
const availableLanguages = ['en', 'np'];

const options = {
  // order and from where user language should be detected
  order: ['navigator', 'htmlTag', 'path', 'subdomain'],
  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,
  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)
  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: window.location.host,
  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,
  // only detect languages that are in the whitelist
  checkWhitelist: true,
};

const storedLang = localStorage.getItem(LANGUAGE) || fallbackLng;
i18n
  .use(Backend) // load translation using xhr -> see /public/locales. We will add locales in the next step
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    lng: storedLang,
    fallbackLng: fallbackLng, // if user computer language is not on the list of available languages, than we will be using the fallback language specified earlier
    debug: false,
    whitelist: availableLanguages,
    detection: options,
    interpolation: {
      escapeValue: false,
    },
  });

if (storedLang) {
  i18n.changeLanguage(storedLang);
}

/**
 * This function acts as a React component or a function to translate the string.
 * TO USE AS REACT COMPONENT: <window.t>STRING</window.t>
 * TO USE AS A FUNCTION TO RETURN TRANSLATED STRING: window.t('STRING')
 */
const t = val => {
  if (typeof val === 'string') {
    return i18n.t(val);
  } else {
    return <Translation>{t => t(val.children)}</Translation>;
  }
};
window.t = t;

export { t };
