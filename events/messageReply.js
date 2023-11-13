const { Events } = require('discord.js');

const spectateVariable = '/?spectate=true';
const spelltableLink = 'https://spelltable.wizards.com';
const dansSpecialKeywords = 'i love you';

module.exports = {
	name: Events.MessageCreate,
    async execute(message) {
		// Ignore messages from the bot itself
        if (message.author.bot) {return};

        if (message.content.toLowerCase().includes(spelltableLink)) {
            // change the link to include the spectate variable
            let spectateLink = message.content += spectateVariable;
            // Reply to the user
            message.reply(`Spectate: ${spectateLink}`);
        }

        // Easter Egg for Dan
        if (message.content.toLowerCase().includes(dansSpecialKeywords)) {
            message.reply(`I love you too, ${message.author}`)
        }
        
	},
};