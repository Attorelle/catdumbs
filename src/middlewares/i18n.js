const path = require('path');
const { I18n } = require("@grammyjs/i18n");

const i18n = new I18n({
  defaultLanguage: 'ru',
  directory: path.resolve(__dirname, './../../locales')
});

module.exports = i18n;
