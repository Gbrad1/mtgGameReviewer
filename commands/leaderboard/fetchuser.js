const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    	.setName('fetchuser')
    	.setDescription('Fetches a user to the leaderboard'),
    category: 'leaderboard',   
    async execute(interaction) {

        const userName = interaction.options.getString('name');

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: tagName } });

        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');

            return interaction.reply(tag.get('description'));
        }
        return interaction.reply(`Could not find tag: ${tagName}`);
    }
};