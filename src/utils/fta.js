const { Context } = require('telegraf');
const config = require("config");
const isAdmin = require("./isAdmin");

const admin = config.get("config.admin");

const forwardToAdmin = async ctx => {
	if (isAdmin(ctx.message.from.id)) {
		await ctx.deleteMessage();
	} else {
		await ctx.forwardMessage(admin, ctx.from.id, ctx.message.id);
		await ctx.reply(ctx.t("on.photo"), {
			reply_to_message_id: ctx.message.message_id
		});
	}
};

module.exports = forwardToAdmin;
