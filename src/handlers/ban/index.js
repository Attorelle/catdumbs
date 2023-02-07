const { Context } = require('telegraf');

// Config
const config = require('config');
const admin = config.get("config.admin");

const fs = require('fs');
const path = require('path');

const isAdmin = require("../../utils/isAdmin");

let array = {
	users: []
};
const banlist = path.resolve("./src/banlist.json");

const banHandler = async ctx => {
	array = JSON.parse(fs.readFileSync(banlist, 'utf8'));
	if (isAdmin(ctx.message.from.id)) {
		const userId = ctx.message.reply_to_message.forward_from.id;
		if (array.users.includes(userId) === false) {
			array.users.push(userId);
			let data = JSON.stringify(array);
			fs.writeFileSync(banlist, data);

			await ctx.telegram.sendMessage(userId, ctx.t("ban.notification"));
			await ctx.reply(ctx.t("ban.done"));
		} else {
			await ctx.reply(ctx.t("ban.already"));
		}
	}
};

module.exports = banHandler;
