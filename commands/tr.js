const {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tr')
        .setDescription('Create a new trade offer'),

    async execute(interaction) {
        const modal = new ModalBuilder()
            .setCustomId('tradeModal')
            .setTitle('🔥 Create a Trade');

        const tradingInput = new TextInputBuilder()
            .setCustomId('trading')
            .setLabel('What are you trading?')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Example: Javelin, Beignet, Hyper Blue')
            .setRequired(true);

        const lookingForInput = new TextInputBuilder()
            .setCustomId('lookingFor')
            .setLabel('What are you looking for?')
            .setStyle(TextInputStyle.Paragraph)
            .setPlaceholder('Example: Torpedo, Hyper Red')
            .setRequired(true);

        const tradingRow = new ActionRowBuilder()
            .addComponents(tradingInput);

        const lookingForRow = new ActionRowBuilder()
            .addComponents(lookingForInput);

        modal.addComponents(tradingRow, lookingForRow);

        await interaction.showModal(modal);
    }
};