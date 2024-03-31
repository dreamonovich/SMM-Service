import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      profile: "Profile",
      settings: "Settings",
      login: "login",
      username: "Username",
      "sign-in": "sign in",
      "enter-username": "Enter username",
      "new-workspace": "New workspace",
      "log-out": "Log out",
      language: "English",
    },
  },
  ru: {
    translation: {
      profile: "Профиль",
      settings: "Настройки",
      login: "войти",
      username: "Имя пользователя",
      "sign-in": "Продолжить",
      "enter-username": "Введите имя пользователя",
      "new-workspace": "Новый workspace",
      "log-out": "Выйти",
      language: "Русский"
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
