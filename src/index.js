const config = require('config');
const { Telegraf } = require('telegraf');

const token = config.get('config.token');
const bot = new Telegraf(token);

bot.start((ctx) => {
    ctx.reply("Hello there! 🐈‍⬛");
});

bot.launch();
