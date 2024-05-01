# mtgGameReviewer
Discord bot used to record mtg games via a modal and user input once the user has executed the '/record' command.

# Commands
/record - pops up a modal to record user input.<br />
/crown - Sets "The Monarch 👑" role to whoever is specified. Should be the user at the top of the leaderboard.

/addUserToLeaderboard - Asks the user to input a name and the amount of wins the user has.
/deleteUser - This will remove a user from the database.
/editUser - SlashCommand to edit the users number of wins.
/fetchUser - returns a user and prints it out to the channel.
/listAllUsers - SlashCommand that returns a list of all users in the sqLite database.
/leaderboard - This is used to set a channel to house the leaderboard if one is not already set in the config.json file or it will simply update the existing leaderboard that is already present. This command should be used whenever a user updates the leaderboard by using another SlashCommand.

# Events
* databaseSync - Syncs the database and initializes it on the server the bot is run on.
* guildMemberAdd - When a user joins the discord, they will be automatically assigned a role.
* interactionCreate - Listens for chat commands.
* messageReply - This is an easter egg.
* ready - logs to the console the the bot is up and running when 'node bot.js' is executed.

# Additional Features
* Crown feature<br />
* When a user posts a spelltable link, the bot will append the spectate variable to the spelltable link <br />
allowing other users to spectate.
