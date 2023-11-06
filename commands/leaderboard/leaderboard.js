const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Displays a leaderboard in the current channel.'),
    category: 'leaderboard',   
    async execute(interaction) {
        //perform some action here to display a leaderboard based on information that is stored in x.
        //x is yet to be determined.
    }
};