require('dotenv').config();

const fs = require('fs');
const path = require('path');

const {
    Client,
    GatewayIntentBits,
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    REST,
    Routes
} = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;


// ===============================
// SLASH COMMANDS
// ===============================

const commands = [];

const commandFiles = fs
    .readdirSync(path.join(__dirname, 'commands'))
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    console.log(`Loading command: ${file}`);

    const command = require(`./commands/${file}`);

    console.log(command);

    if (!command.data) {
        console.log(`❌ ERROR: ${file} does not have data!`);
        continue;
    }

    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' })
    .setToken(TOKEN);


// ===============================
// BOT READY
// ===============================

client.once('ready', async () => {

    console.log(`Logged in as ${client.user.tag}`);

    try {

        await rest.put(
            Routes.applicationGuildCommands(
                CLIENT_ID,
                GUILD_ID
            ),
            {
                body: commands
            }
        );

        console.log('/tr and /lfg commands registered!');

    } catch (error) {

        console.error(error);

    }
});


// ===============================
// INTERACTIONS
// ===============================

client.on('interactionCreate', async interaction => {
    console.log('Interaction received:', interaction.type, interaction.customId);
    try {
        // SLASH COMMANDS
        if (interaction.isChatInputCommand()) {
            const command = require(`./commands/${interaction.commandName}.js`);

            if (!command) return;

            await command.execute(interaction);
        }

        // TRADE MODAL SUBMISSION
// TRADE BUTTONS
if (interaction.isButton()) {

    if (interaction.customId === 'accept_trade') {
        await interaction.reply({
            content: `✅ ${interaction.user} accepted this trade!`,
            ephemeral: false
        });
        return;
    }

    if (interaction.customId === 'decline_trade') {
        await interaction.reply({
            content: `❌ ${interaction.user} declined this trade.`,
            ephemeral: false
        });
        return;
    }

    if (interaction.customId === 'remove_trade') {
        await interaction.message.delete();
        return;
    }
}
        if (interaction.isModalSubmit()) {
            if (interaction.customId === 'tradeModal') {

                const trading = interaction.fields.getTextInputValue('trading');
                const lookingFor = interaction.fields.getTextInputValue('lookingFor');

                const embed = new EmbedBuilder()
                    .setColor(0x00ff88)
                    .setTitle('🔥 NEW TRADE')
                    .addFields(
                        {
                            name: '📦 Trading',
                            value: trading
                        },
                        {
                            name: '🔎 Looking For',
                            value: lookingFor
                        }
                    )
                    .setFooter({
                        text: `Posted by ${interaction.user.username}`
                    })
                    .setTimestamp();

                const acceptButton = new ButtonBuilder()
    .setCustomId('accept_trade')
    .setLabel('Accept Trade')
    .setStyle(ButtonStyle.Success)
    .setEmoji('✅');

const declineButton = new ButtonBuilder()
    .setCustomId('decline_trade')
    .setLabel('Decline Trade')
    .setStyle(ButtonStyle.Danger)
    .setEmoji('❌');

const removeButton = new ButtonBuilder()
    .setCustomId('remove_trade')
    .setLabel('Remove Trade')
    .setStyle(ButtonStyle.Secondary)
    .setEmoji('🗑️');

const row = new ActionRowBuilder()
    .addComponents(acceptButton, declineButton, removeButton);

console.log('Sending trade with buttons:', row.toJSON());

await interaction.reply({
    embeds: [embed],
    components: [row],
    ephemeral: false
});

return;
            }
        }

    } catch (error) {
        console.error(error);

        if (!interaction.replied && !interaction.deferred) {
            await interaction.reply({
                content: '❌ Something went wrong!',
                ephemeral: true
            });
        }
    }
});


// ===============================
// LOGIN
// ===============================

client.login(TOKEN);