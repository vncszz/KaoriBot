const Discord = require("discord.js")
const config = require("../../config.json")

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("formulario-staff")
        .setDescription("."),

    async execute(interaction) {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {
            const embed_painel = new Discord.EmbedBuilder()
                .setColor("#45D3E1")
                .setTitle("<:squad:1119398254241660929> Seja Staff")
                .setImage(config.imagem)
                .addFields({name: `Lembre-se`, value: `Deixe sua dm aberta para que possamos notificar caso você seja aprovado!`})
                .setFooter({ text: `©Anime's Zero - Todos os direitos reservados` })
                .setDescription(`**Caso você tenha interesse em ingressar em nossa equipe, leia as informações abaixo e fique ciente de tudo que você precisa saber antes de realizar o formulário.**
               
<:dotazul_az:1122527955361464431> Ter maturidade e responsabilidade para lidar com diversas situações.
<:dotazul_az:1122527955361464431> Ter no minimo 14 anos de idade.
<:dotazul_az:1122527955361464431> Ter no minimo 200 mensagens no servidor.
<:dotazul_az:1122527955361464431> Conhecer o básico da área que você desejar entrar.
<:dotazul_az:1122527955361464431> Ter tempo disponível para dedicar ao servidor.
<:dotazul_az:1122527955361464431> Ter respeito e seguir todas as regras a risca.`)

            const button = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("formulario_staff")
                        .setLabel("Clique Aqui")
                        .setStyle(Discord.ButtonStyle.Primary)
                )

            interaction.reply({ content: "Painel Enviado com Sucesso", ephemeral: true })
            await interaction.channel.send({ embeds: [embed_painel], components: [button] })
        }

    }
}