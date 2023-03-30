const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, ChannelType } = require('discord.js');
const bot = require('../../bot.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('img')
        .setDescription('Envie uma imagem no canal que desejar.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((channel) => channel.setName('canal').setDescription('canal onde será enviado.').setRequired(true).addChannelTypes(ChannelType.GuildText))
        .addAttachmentOption((arquivo) => arquivo.setName('imagem').setDescription('Envie a imagem que será enviado.').setRequired(true))
        .addStringOption((message) => message.setName('mensagem').setDescription('Um mensagem caso queira que seja enviada.').setRequired(false)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * 
     */
    async execute(interaction) {

        if (!interaction.member.permissions.has(bot.config.naomiAcess)) {
            interaction.reply({ content: `você não tem permissão pra isso.`, ephemeral: true })
        }

        else {

            let channel = interaction.options.getChannel("canal")
            let arquivo = interaction.options.getAttachment("imagem")
            let mensagem = interaction.options.getString('mensagem') || ""

            const img = `${arquivo}`

            interaction.reply({
                content: `**Sua imagem foi enviada com sucesso no canal ${channel}!**`,
                ephemeral: true
            })

            await channel.send({ content: `${mensagem}`, files: [arquivo] })
        }


    }

}
