const { SlashCommandBuilder } = require('discord.js');
const { guildId } = require('../../config.json');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deleteuser')
        .setDescription('Deletes a user from the leaderboard')
        .addUserOption(option => option
            .setName('guild-member')
            .setDescription('The name of the user you wish to delete from the DB')
            .setRequired(true)
        ), 
    category: 'leaderboard',
    async execute(interaction) {
        const guild_member = interaction.options.getUser('guild-member');
        const guild_member_username = guild_member.username;

        //check if the running user is the server owner
        //get the guild 
        const guild = interaction.guild;
        const guild_ownerId = guild.ownerId;

        if (interaction.user.id != guild_ownerId) {
            return interaction.reply('Only the discord owner can delete records.');
        }

	    // equivalent to: DELETE from tags WHERE name = ?;
	    const rowCount = await Users.destroy({ where: { name: guild_member_username } });

	    if (!rowCount) {
            return interaction.reply('That user doesn\'t exist.');
        }
	    return interaction.reply(`${guild_member_username} deleted from the DB.`);
    },
};