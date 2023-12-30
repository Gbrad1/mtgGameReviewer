const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('listusers')
    	.setDescription('lists all of our users and scores'),
    categegory: 'leaderboard',
    async execute(interaction) {
    // equivalent to: SELECT name FROM users
    const user_list = await Users.findAll({ attributes: ['name'] });
    const user_string = user_list.map(t => t.name).join(', ') || 'No users set.';

	return interaction.reply(`List of tags: ${user_string}`);
    }
}