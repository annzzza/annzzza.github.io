let translations = {};

async function loadLanguage(lang) {
    const response = await fetch(`locales/${lang}.json`);
    translations = await response.json();
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

const savedLang = localStorage.getItem('lang') || 'en';
const browserLang = navigator.language.slice(0, 2);
const supportedLangs = ['en', 'fr', 'it'];
const initialLang = supportedLangs.includes(savedLang) ? savedLang 
                  : supportedLangs.includes(browserLang) ? browserLang 
                  : 'en';

loadLanguage(initialLang);