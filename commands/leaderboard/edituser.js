const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
    	.setName('edituser')
    	.setDescription('Edits a user in the leaderboards number of wins')
        .addUserOption(option => option
            .setName('guild-member')
                .setDescription('The Name to be fetched from the DB')
                .setRequired(true)
            )
            .addIntegerOption(option => option
                .setName('number-of-wins')
                    .setDescription('Set the number of wins for this user')
                    .setRequired(true)
                ),
    category: 'leaderboard',   
    async execute(interaction) {

        const guild_member = interaction.options.getUser('guild-member');
        const guild_member_username = guild_member.username;
        const number_of_wins = interaction.options.getInteger('number-of-wins');
    
        // equivalent to: UPDATE users (description) values (?) WHERE name='?';
        const affectedRows = await Users.update({ numberOfWins: number_of_wins }, { where: { name: guild_member_username } });
    
        if (affectedRows > 0) {
            console.log(`Row updated. ${guild_member_username} now has ${number_of_wins} wins.`);
            return interaction.reply(`Tag ${guild_member_username} was edited.`);
        }
    
        return interaction.reply(`Could not find a user with name ${guild_member_username}. Please add the user with
        the /addusertoleaderboard command.`);
    }
};