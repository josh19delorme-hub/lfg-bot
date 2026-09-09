const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vouch')
        .setDescription('Vouch for a player')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The player you want to vouch for')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('message')
                .setDescription('Your vouch message')
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const message = interaction.options.getString('message');

        const embed = new EmbedBuilder()
            .setColor(0x00ff88)
            .setTitle('⭐ New Vouch!')
            .setDescription(
                `**Vouched For:** ${user}\n` +
                `**Vouched By:** ${interaction.user}\n\n` +
                `💬 **Message:** ${message}`
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};