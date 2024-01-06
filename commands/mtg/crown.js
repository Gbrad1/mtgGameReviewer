const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { guildId, roleId } = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('crown')
    .setDescription('Declare the most recent winner'),
  category: 'mtg',
  async execute(interaction) {
    // Fetch the guild (server) from the bot
    const guild = interaction.guild;

    // Check if the guild exists
    if (!guild) {
      return interaction.reply('Error: Guild not found');
    }

    // Fetch all members from the guild
    const members = await guild.members.fetch();

    // Create an array of select menu options
    const options = members.map((member) => ({
      label: member.user.nickname ? member.user.nickname : member.user.username,
      value: member.user.id,
    }));

    // Sort options by label property
    options.sort(function (a, b) {
      let a2lc = a.label.toLowerCase();
      let b2lc = b.label.toLowerCase();
      if (a2lc < b2lc) {
        return -1;
      }
      if (a2lc > b2lc) {
        return 1;
      }
      return 0;
    });

    // Build the menu
    const chooseAWinnerMenu = new ActionRowBuilder()
      .addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select')
          .setPlaceholder('Select a user')
          .addOptions(options),
      );

    // Display the menu to the user as a reply.
    await interaction.reply({
      content: 'Who won the crown?',
      components: [chooseAWinnerMenu],
    });

    const filter = (userInteraction) => userInteraction.customId === 'select';
    const userInteraction = await interaction.channel.awaitMessageComponent({
      filter,
      time: 60000,
    });

    if (!userInteraction) {
      return interaction.reply('Time limit exceeded, crown not assigned.');
    }

    const selectedUserId = userInteraction.values[0]; // Extract the selected user's ID
    const selectedUser = guild.members.cache.get(selectedUserId);

    if (selectedUser) {
      // Initialize role
      const role = guild.roles.cache.get(roleId);

      // Ensure the role exists
      if (!role) {
        return userInteraction.reply('Role not found.');
      }

      // Iterate through all guild members and remove the role from others
      members.forEach(async (member) => {
        if (member.id !== selectedUserId && member.roles.cache.has(role.id)) {
          try {
            await member.roles.remove(role);
          } catch (error) {
            console.error(`Error removing role from member: ${error}`);
            userInteraction.reply('Failed to remove the role from other members.');
          }
        }
      });

      // Assign the role to the selected user
      try {
        await selectedUser.roles.add(role);
        userInteraction.reply(`Assigned ${role.name} role to ${selectedUser.user.tag}`);
        console.log(`Assigned ${role.name} role to ${selectedUser.user.tag}`);
      } catch (error) {
        console.error(`Error assigning role: ${error}`);
        userInteraction.reply('Failed to assign the role.');
      }
    } else {
      userInteraction.reply('User not found.');
    }
  },
};
