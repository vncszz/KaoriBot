const { TextInputStyle } = require("discord.js")
const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("parceria")
        .setDescription("[👥] faça uma Parceria"),

    /**
     * 
     * @param {interaction} interaction 
     */

    async execute(interaction) {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true });
        } else {

            const modal = new Discord.ModalBuilder()
                .setCustomId('partner')
                .setTitle('Parceria 👥')

            const idPartner = new Discord.TextInputBuilder()
                .setCustomId('idPartner')
                .setLabel('Insira o ID aqui')

                .setStyle(TextInputStyle.Short)

            const invitePartner = new Discord.TextInputBuilder()
                .setCustomId('invitePartner')
                .setLabel('Insira o convite aqui')

                .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new Discord.ActionRowBuilder().addComponents(idPartner);
            const secondActionRow = new Discord.ActionRowBuilder().addComponents(invitePartner)

            modal.addComponents(firstActionRow, secondActionRow)
            await interaction.showModal(modal);
        }
    }
}