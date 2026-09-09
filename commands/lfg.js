const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lfg')
        .setDescription('Find players to grind with'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor(0x00ff88)
            .setTitle('🔥 LFG - TIME TO GRIND HYPERS!')
            .setDescription(
                `👤 **Player:** ${interaction.user}\n\n` +
                `💬 **Join up and grind some hypers!**`
            )
            .setFooter({
                text: 'LFG System'
            })
            .setTimestamp();

        await interaction.reply({
            embeds: [embed]
        });
    }
};