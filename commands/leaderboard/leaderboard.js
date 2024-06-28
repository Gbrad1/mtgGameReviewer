const { SlashCommandBuilder } = require('discord.js');
const { leaderboardMessageId, leaderboardChannelId } = require('../../config.json');
const Users = require('../../models/user.js');
const fs = require('fs/promises');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays/updates the leaderboard in the current channel.'),
    category: 'leaderboard',   
    async execute(interaction) {
        // Fetch data from SQLite database
        updateLeaderboard(interaction);
            // Respond to the original interaction
            if (!interaction.deferred) {
            await interaction.reply('Leaderboard updated!');
        }
    },
    updateLeaderboard: async function(interaction) {
        const user_list = await Users.findAll({ attributes: ['name', 'numberOfWins'] });        
        // parse through each user that came back and store it's value to an array.
        let list_of_users = [];
        user_list.forEach(user => list_of_users.push(user.dataValues));
        const info = formatDataIntoRows(list_of_users.sort((a, b) => b.numberOfWins - a.numberOfWins));
    
        // Send or edit the Discord message
        // If there's no stored message ID, send a new message
        console.log(`leaderboardMessageId ${leaderboardMessageId}`);
        if (leaderboardMessageId === '') {
            const leaderboardChannel = interaction.client.channels.cache.get(leaderboardChannelId);
            const sentMessage = await leaderboardChannel.send(`Leaderboard:\n\`\`\`${info.join('\n')}\`\`\``);
            let messageId = sentMessage.id;
            console.log('we got here meaning we should update the JSON file');
            addVariableToJsonFile(messageId);
        } else {
            console.log('---- Updating leaderboard ----');
            // Fetch the channel and message
            const leaderboardChannel = interaction.client.channels.cache.get(leaderboardChannelId);
            const leaderboardMessage = await leaderboardChannel.messages.fetch(leaderboardMessageId);
            
            // Edit the existing message with updated content
            leaderboardMessage.edit(`Leaderboard:\n\`\`\`${info.join('\n')}\`\`\``);
        }
    }
    
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

// Function to read the JSON file
async function readJsonFile(filePath) {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        // Handle errors appropriately
        console.error('Error reading JSON file:', error);
        return {};
    }
}

// Function to write the JSON file
async function writeJsonFile(filePath, data) {
    try {
        const jsonData = JSON.stringify(data, null, 2);
        await fs.writeFile(filePath, jsonData, 'utf-8');
        console.log('JSON file updated successfully.');
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
}

// Add a variable to the JSON file
async function addVariableToJsonFile(value) {
    const filePath = './config.json';

    // Read existing JSON data
    const jsonData = await readJsonFile(filePath);

    // Add a new variable to the object
    jsonData.leaderboardMessageId = value;

    // Write the updated object back to the file
    await writeJsonFile(filePath, jsonData);
}

