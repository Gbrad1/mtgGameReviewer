const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Updates user score ++'),
    category: 'leaderboard',   
    async execute(interaction) {
        //perform some action here to display a leaderboard based on information that is stored in x.
        //x is yet to be determined.
    }
};