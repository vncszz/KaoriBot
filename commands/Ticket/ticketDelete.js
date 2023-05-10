const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const bot = require("../../bot.json");
const client = require("../../index")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-delete")
        .setDescription("Apagar um ticket sem interação ao botão."),

    async execute(interaction) {

        if (!interaction.member.permissions.has(bot.config.eqpTicket)) {
            interaction.reply({ content: `Esse comando está disponível apenas para staffs!` })
        } else {

            const buttons = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("sim").setLabel("Sim").setStyle(ButtonStyle.Success),
                new ButtonBuilder().setCustomId("nao").setLabel("Não").setStyle(ButtonStyle.Danger),

            );

            await interaction.reply({ content: `Confirme suas ações <a:Loading:1077708788808810576>\nDeseja Deletar esse ticket?`, components: [buttons] });

        }

    }

}
