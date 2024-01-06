/**
 * Created by: Giles Bradford
 * 
 * This discord bot is my personal project used to teach myself javascript. I find it easier to tackle a real world example that I am passionate about than reading/taking
 * a course that covers every fundamental part of the language. I'll use what I need and increasingly build more as I come across new challenges and ideas. 
 */

/** Every 'file' in a node.js project is it's own module. You have to assume that the file is not aware of any other 'module' or 'file' in the project. 
 * So how do you tell the current module about another file? You have to use the require method which you will usually see at the top of the current module. 
 * As the module loads, it will load whatever is required. 
 */
// fs is Node's native file system module -- used to read commands directory and identify our command files.
const fs = require('node:fs');
// path is Node's native path utility module -- helps construct paths to access files and drectories.
const path = require('node:path');

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Intents are used to give the bot only what it needs.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent
    ]
});

module.exports = {
    client,
};

// list of commands that are bot will listen for.
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
} 

client.login(token);