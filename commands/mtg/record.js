/**
 * Author: Giles Bradford
 * Date: 2023-10-16
 * Purpose: To provide friends with a way to record and keep track of MTG games we play.
 */

const { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('record')
        .setDescription('Records game details.'),
    category: 'mtg', 
    async execute(interaction) {
        const modal = new ModalBuilder({
            customId: `myModal-${interaction.id}`,
            title: 'Game Summary',
        });

        // question 1
        const whoPlayedInTheGameInput = new TextInputBuilder({
            customId: 'whoPlayedInTheGameInput',
            label: 'Who played in the game?',
            style: TextInputStyle.Short,
        });

        // question 2
        const gameFormatInput = new TextInputBuilder({
            customId: 'gameFormatInput',
            label: 'What was the game format?',
            style: TextInputStyle.Short,
        });

       // question 3
       const whoWonTheGameInput = new TextInputBuilder({
            customId: 'whoWonTheGameInput',
            label: 'Who won the game?',
            style: TextInputStyle.Short,
        });

        // question 4
        const howLongWasTheGameInput = new TextInputBuilder({
            customId: 'howLongWasTheGameInput',
            label: 'How long was the game?',
            style: TextInputStyle.Short,
        });

        // question 5
        const matchHighlightInput = new TextInputBuilder({
            customId: 'matchHighlightInput',
            label: 'What was the match highlight?',
            style: TextInputStyle.Paragraph,
        });
        
        // set rows for the modal
        const firstActionRow = new ActionRowBuilder().addComponents(whoPlayedInTheGameInput);
		const secondActionRow = new ActionRowBuilder().addComponents(gameFormatInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(whoWonTheGameInput);
        const fourthActionRow = new ActionRowBuilder().addComponents(howLongWasTheGameInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(matchHighlightInput);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fifthActionRow);

        await interaction.showModal(modal);

        // wait for the modal to be submitted
        const filter = (currentInteraction) => currentInteraction.customId === `myModal-${interaction.id}`;

        interaction
        .awaitModalSubmit({ filter, time: 60_000 })
        .then((modalInteraction) => {
            const whoPlayedInTheGameInputValue = modalInteraction.fields.getTextInputValue('whoPlayedInTheGameInput');
            const gameFormatInputValue = modalInteraction.fields.getTextInputValue('gameFormatInput');
            const whoWonTheGameInputValue = modalInteraction.fields.getTextInputValue('whoWonTheGameInput');
            const howLongWasTheGameInputValue = modalInteraction.fields.getTextInputValue('howLongWasTheGameInput');
            const matchHighlightInputValue = modalInteraction.fields.getTextInputValue('matchHighlightInput');

            const output = `Players: ${whoPlayedInTheGameInputValue}\nFormat: ${gameFormatInputValue}\nWinner: ${whoWonTheGameInputValue}\nMatch Time: ${howLongWasTheGameInputValue}\nMatch Highlight: ${matchHighlightInputValue}`;
            
            modalInteraction.reply(output);
            console.log(`----- ${interaction.user.username} successfully created a record -----\n${output}`);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        });
    },
};