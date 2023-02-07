const config = require('config');
const { Telegraf } = require('telegraf');
const i18n = require('./middlewares/i18n');

// Handlers
const banHandler = require("./handlers/ban");

// Utils
const forwardToAdmin = require("./utils/fta");
const isAdmin = require("./utils/isAdmin");

const token = config.get('config.token');
const bot = new Telegraf(token);

bot.use(i18n.middleware());

bot.start(async ctx => {
	if (!isAdmin(ctx.message.from.id)) {
		await ctx.reply(ctx.t('start.usr'), {
			parse_mode: "HTML"
		});
	} else {
		await ctx.reply(ctx.t('start.adm'));
	}
});
bot.command('ban', async ctx => {
	banHandler(ctx);
});

bot.on('photo', async ctx => {
	forwardToAdmin(ctx);
});

bot.on('message', async ctx => {
	await ctx.reply(ctx.t('on.any'));
});

bot.launch();
