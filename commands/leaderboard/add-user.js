const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../bot.js');

module.exports = {
    data: new SlashCommandBuilder()
    	.setName('add-user')
    	.setDescription('Adds a user to the leaderboard')
		.addUserOption(option => option
			.setName('guild-member')
				.setDescription('The Name to be inserted into the DB')
				.setRequired(true)
			)
		.addIntegerOption(option => option
			.setName('number-of-wins')
				.setDescription('Set the number of wins for this user')
				.setRequired(true)
			),
    category: 'leaderboard',   
    async execute(interaction) {
		console.log(interaction);
        const guildMember = interaction.options.getUser('guild-member');
		const numberOfWins = interaction.options.getInteger('number-of-wins') ?? 0;
		
        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const user = await Users.create({
				id: guildMember.id,
				name: guildMember,
				numberOfWins: numberOfWins,
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