const { SlashCommandBuilder } = require('discord.js');
const Users = require('../../models/user.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays/updates the leaderboard in the current channel.'),
    category: 'leaderboard',   
    async execute(interaction) {
        // Fetch data from SQLite database
        const user_list = await Users.findAll({ attributes: ['name', 'numberOfWins'] });        
        // parse through each user that came back and create an 
        let list_of_users = [];

        user_list.forEach(user => list_of_users.push(user.dataValues));
        console.log(`list of users \n ${list_of_users}`);

        const info = formatDataIntoRows(list_of_users);
        // Send or edit the Discord message
        if (!interaction.deferred) {
            await interaction.deferReply();
        }

        // Send or edit the message with the database content
        interaction.editReply(`Leaderboard:\n\`\`\`${info.join('\n')}\`\`\``);
    },
};

// Format the data into a grid
function formatDataIntoRows(data) {
    // Example formatting logic
    const headerRow = Object.keys(data[0]).join(' | ');

    const contentRows = data.map(entry => {
        return Object.values(entry).join(' | ');
    });

    return [headerRow, '-'.repeat(headerRow.length), ...contentRows];
}