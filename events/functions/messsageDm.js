const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const client = require("../../index")

module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isButton()) return;

        if (interaction.customId === 'private-message') {
            const user = interaction.message.content.split(/\D+/).filter(Boolean).at(0);

            if (interaction.user.id !== user) {
                interaction.reply({ content: `**|** Apenas o usuário <@${user}> pode visualizar a mensagem!`, ephemeral: true })
                return;
            }

            const message = await db.get(`Private/Messages/${interaction.message.id}`)
            const author = client.users.cache.get(message.author)

            const button = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel(`Mensagem enviada por ${author.username}`)
                        .setCustomId('static-message')
                        .setDisabled(true)
                )
            interaction.reply({ content: `${message.data}`, components: [button], ephemeral: true })
        }
    }
}