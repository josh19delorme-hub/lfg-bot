const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('hyper')
        .setDescription('Create an LFG for Hyper grinding'),

    async execute(interaction) {
        const LFG_ROLE_ID = '1546681502446780477';

        const embed = new EmbedBuilder()
            .setColor(0x00ff88)
            .setTitle('🔥 LFG - TIME TO GRIND HYPERS!')
            .addFields(
                {
                    name: '🔵 Player',
                    value: `${interaction.user}`
                },
                {
                    name: '💬 Join up and grind some hypers!',
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