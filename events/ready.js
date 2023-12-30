const { Events, ActivityType, Activity } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! 💠 Logged in as ${client.user.tag}`);
		client.user.setActivity("Magic The Gathering", {
			type: ActivityType.Playing,
		});
	},
};