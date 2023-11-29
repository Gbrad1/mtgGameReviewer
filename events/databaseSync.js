const { Events } = require('discord.js');
const Users = require('../models/user');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        // this forced method is just used for now to get a blank slate everytime I fire up the bot.
		Users.sync({ force: true});
        console.log(`⚙️ ${client.user.tag} synced the database. It is ready for use.`);
	},
};