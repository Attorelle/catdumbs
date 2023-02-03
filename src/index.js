const config = require('config');
const { Telegraf } = require('telegraf');
const i18n = require('./middlewares/i18n');

const token = config.get('config.token');
const admin = config.get('config.admin');
const bot = new Telegraf(token);

let isAdmin = (userId) => {
	return userId == admin;
};

let forwardToAdmin = async ctx => {
	if (isAdmin(ctx.message.from.id)) {
		await ctx.deleteMessage();
	} else {
		await ctx.forwardMessage(admin, ctx.from.id, ctx.message.id);
		await ctx.reply(ctx.t("on.photo"), {
			reply_to_message_id: ctx.message.message_id
		});
	}
};

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

bot.on('photo', async ctx => {
	forwardToAdmin(ctx);
});

bot.on('message', async ctx => {
	await ctx.reply(ctx.t('on.any'));
});

bot.launch();
