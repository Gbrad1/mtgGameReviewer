const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('1')
    .setDescription('Adds one to the users current score')
    .addUserOption(option => option
        .setName('guild-member')
            .setDescription('The Name to be fetched from the DB')
            .setRequired(true)
        ),
    category: 'leaderboard',
    async execute(interaction) {
        const guild_member = interaction.options.getUser('guild-member');
        const guild_member_username = guild_member.username;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const guild_member_record = await Users.findOne({ where: { name: guild_member_username } });

        if (guild_member_record) {
            // equivalent to: UPDATE tags SET numberOfWins = numberOfWins + 1 WHERE name = 'tagName';
            guild_member_record.increment('numberOfWins');

            return interaction.reply(String(guild_member_record.get('numberOfWins')));
        }

        return interaction.reply(`Could not find a user with name ${guild_member_username}. Please add the user with
        the /addusertoleaderboard command.`);
    }
}