const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('adduser')
    .setDescription('Adds a user to the leaderboard'),
    category: 'leaderboard',   
    async execute(interaction) {

        const userName = interaction.options.getString('name');

        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const user = await Users.create({
				name: userName
			});

            console.log(`User ${user.name} added.`);
			return interaction.reply(`User ${user.name} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
                console.log(`User ${user.name} already exists.`);
				return interaction.reply('That user already exists.');
			}
            console.log('Something went wrong with adding a user.');
			return interaction.reply('Something went wrong with adding a user.');
		}
    }
};