const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
    	.setName('addusertoleaderboard')
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
        const guildMember = interaction.options.getUser('guild-member');
		const numberOfWins = interaction.options.getInteger('number-of-wins') ?? 0;
		
		console.log(`guildMember ${guildMember.username}`);
		console.log(`numberOfWins ${numberOfWins}`);

		if (!guildMember) {
			console.log('guildMember not initialized');
		}

		if (!numberOfWins) {
			console.log('numberOfWins not initialized');
		}
		
        try {
			// equivalent to: INSERT INTO tags (name, description, username) values (?, ?, ?);
			const user = await Users.create({
				//id: guildMember.User.Id,
				name: guildMember.username,
				numberOfWins: numberOfWins,
			});

            console.log(`User ${guildMember.username} added.`);
			return interaction.reply(`User ${guildMember.username} added.`);
		}
		catch (error) {
			if (error.name === 'SequelizeUniqueConstraintError') {
                console.log(`User ${user.name} already exists.`);
				return interaction.reply('That user already exists.');
			}
            console.log(`Something went wrong with adding a user. ${error}`);
			return interaction.reply('Something went wrong with adding a user.');
		}
    }
};