const { TextInputStyle, ModalBuilder, TextInputBuilder, ActionRowBuilder, SlashCommandBuilder } = require("discord.js")
const bot = require("../../bot.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("parceria")
        .setDescription("Use para fazer parcerias."),

    async execute(interaction) {

        if (!interaction.member.roles.cache.has("988493069731102760")) {
            interaction.reply({ content: `Você não tem o cargo suporte!`, ephemeral: true });
        } else {

            const modal = new ModalBuilder()
                .setCustomId('partner')
                .setTitle('Parceria ✍️')

            const idPartner = new TextInputBuilder()
                .setCustomId('idPartner')
                .setLabel('Cole o Id do representante aqui.')
                .setStyle(TextInputStyle.Short)

            const invitePartner = new TextInputBuilder()
                .setCustomId('invitePartner')
                .setLabel('cole o convite do representante aqui.')
                .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new ActionRowBuilder().addComponents(idPartner);
            const secondActionRow = new ActionRowBuilder().addComponents(invitePartner)

            modal.addComponents(firstActionRow, secondActionRow)
            await interaction.showModal(modal);
        }
    }
}