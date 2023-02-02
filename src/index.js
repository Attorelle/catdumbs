const config = require('config');
const { Telegraf } = require('telegraf');

const token = config.get('config.token');
const admin = config.get('config.admin');
const bot = new Telegraf(token);

let isAdmin = (userId) => {
	return userId == admin;
};

let forwardToAdmin = async (ctx) => {
	if (isAdmin(ctx.message.from.id)) {
		await ctx.deleteMessage();
	} else {
		await ctx.forwardMessage(admin, ctx.from.id, ctx.message.id);
		await ctx.reply("Сообщение отправлено!", {
			reply_to_message_id: ctx.message.message_id
		});
	}
};

let onStart = {
	"toUser": "Привет! Это — бот-предложка канала «шерстяные презервативы»! 🐈‍⬛\nНа данный момент принимаются исключительно изображения.",
	"toAdmin": "Привет! Я готов принимать новые посты!"
};

bot.start(async (ctx) => {
    await ctx.reply(isAdmin(ctx.message.from.id) ? onStart.toAdmin : onStart.toUser);
});

bot.on('message', async (ctx) => {
	forwardToAdmin(ctx);
});

bot.launch();
