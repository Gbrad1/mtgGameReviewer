const { Events } = require('discord.js');
const Users = require('../models/user');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        // this forced method is just used for now to get a blank slate everytime I fire up the bot.
		// we have this commented out so when we make changes to the bot and restart it, the db won't restart.
		Users.sync({ force: true});
        console.log(`⚙️ ${client.user.tag} synced the database. It is ready for use.`);
	},
};