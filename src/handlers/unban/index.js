const { Telegraf } = require('telegraf');

// Config
const config = require('config');
const admin = config.get("config.admin");

const fs = require('fs');
const path = require('path');

let array = {
	users: []
};
const banlist = path.resolve("./src/banlist.json");

const unbanHandler = async ctx => {
	array = JSON.parse(fs.readFileSync(banlist, 'utf8'));
	const userId = ctx.message.reply_to_message.forward_from.id;
	const requiredId = array.users.indexOf(userId);
	if (requiredId > -1) {
		array.users.splice(requiredId, 1);
		let data = JSON.stringify(array);
		fs.writeFileSync(banlist, data);

		await ctx.telegram.sendMessage(userId, ctx.t("unban.notification"));
		await ctx.reply(ctx.t("unban.done"));
	} else {
		await ctx.reply(ctx.t("unban.err"));
	}
};

module.exports = unbanHandler;
