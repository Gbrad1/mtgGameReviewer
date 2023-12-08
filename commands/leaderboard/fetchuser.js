const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('fetchuser')
    .setDescription('Fetches the user record')
    .addUserOption(option => option
        .setName('guild-member')
            .setDescription('The Name to be fetched from the DB')
            .setRequired(true)
        ),
    category: 'leaderboard',   
    async execute(interaction) {
        const guild_member = interaction.options.getUser('guild-member');
        const guild_member_username = guild_member.username;
        console.log(typeof guild_member_username);
        // equivalent to: SELECT * FROM users WHERE name = 'tagName' LIMIT 1;
	    const user = await Users.findOne({ where: { name: guild_member_username } });

        if (user) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
		    //tag.increment('usage_count');

            const number_of_wins_string_format = user.get('numberOfWins').toString();

            return interaction.reply(number_of_wins_string_format);
        }
        return interaction.reply(`Could not find user: ${guild_member_username}`);
    }
};