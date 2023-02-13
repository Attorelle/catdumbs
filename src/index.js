const config = require('config');
const { Telegraf } = require('telegraf');
const i18n = require('./middlewares/i18n');

// Handlers
const banHandler = require("./handlers/ban");
const unbanHandler = require("./handlers/unban");

// Utils
const forwardToAdmin = require("./utils/fta");
const isAdmin = require("./utils/isAdmin");

const token = config.get('config.token');
const bot = new Telegraf(token);

bot.use(i18n.middleware());

bot.start(async ctx => {
	if (!isAdmin(ctx.from.id)) {
		await ctx.reply(ctx.t('start.usr'), {
			parse_mode: "HTML"
		});
	} else {
		await ctx.reply(ctx.t('start.adm'));
	}
});

bot.command('ban', async ctx => {
	if (isAdmin(ctx.from.id)) {
		banHandler(ctx);
	}
});

bot.command('unban', async ctx => {
	if (isAdmin(ctx.from.id)) {
		unbanHandler(ctx);
	}
});

bot.on('photo', async ctx => {
	forwardToAdmin(ctx);
});

bot.on('message', async ctx => {
	await ctx.reply(ctx.t('on.any'));
});

bot.launch();
