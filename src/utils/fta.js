const { Context } = require('telegraf');

const config = require("config");
const admin = config.get("config.admin");

const isAdmin = require("./isAdmin");

const path = require('path');
const fs = require('fs');
let array = {
	users: []
};
const banlist = path.resolve("./src/banlist.json");

const forwardToAdmin = async ctx => {
    array = JSON.parse(fs.readFileSync(banlist, 'utf8'));
	const userId = ctx.message.from.id;
	const getChat = await ctx.getChat(userId);

	if (array.users.includes(userId)) {
		await ctx.reply(ctx.t("ban.notification"));
	} else {
		if (isAdmin(userId)) {
			await ctx.reply(ctx.t("on.reject"));
		} else {
			await ctx.forwardMessage(admin, userId, ctx.message.id);
			await ctx.reply(ctx.t("on.photo"), {
				reply_to_message_id: ctx.message.message_id
			});
		}
	}
};

module.exports = forwardToAdmin;
