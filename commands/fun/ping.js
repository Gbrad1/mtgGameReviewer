const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with PONG!'),
	category: 'fun',
	async execute(interaction) {
		await interaction.reply('PONG!');
	},
};
