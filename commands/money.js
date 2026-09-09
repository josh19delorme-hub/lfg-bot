const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('money')
        .setDescription('Create an LFG for money grinding'),

    async execute(interaction) {
        const LFG_ROLE_ID = '1546681502446780477';

        const embed = new EmbedBuilder()
            .setColor(0xffd700)
            .setTitle('💰 LFG - MONEY GRIND!')
            .addFields(
                {
                    name: '🔵 Player',
                    value: `${interaction.user}`
                },
                {
                    name: '💬 Join up and grind some money!',
                    value: '\u200B'
                }
            )
            .setFooter({
                text: 'LFG System'
            })
            .setTimestamp();

        await interaction.reply({
            content: `<@&${LFG_ROLE_ID}>`,
            embeds: [embed],
            allowedMentions: {
                roles: [LFG_ROLE_ID]
            }
        });
    }
};