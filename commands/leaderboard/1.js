const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');
const leaderboard = require('./leaderboard.js');

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

        if (guild_member_record == null) {
            await interaction.reply(`${guild_member_username} is not in the database yet. Please use the /addusertoleaderboard command.`);
            return;
        }
        const number_of_wins = guild_member_record.get('numberOfWins') + 1;

        // equivalent to: UPDATE tags SET numberOfWins = numberOfWins + 1 WHERE name = 'tagName';
        guild_member_record.increment('numberOfWins');

        if (number_of_wins == 1) {
            console.log(`${guild_member_username} got their first win!!!\n`);
            await interaction.reply(`Congratulations on your first win!`);
            leaderboard.updateLeaderboard(interaction);
            return;
        }

        console.log(`${guild_member_username} now has ${number_of_wins}  wins.\n`);
        await interaction.reply({content: `${guild_member_username} now has ${number_of_wins} victories`, ephemeral: true});
        // add some sort of pause
        setTimeout(function () {
            interaction.deleteReply();
          }, 5000);
          leaderboard.updateLeaderboard(interaction);
    }
}