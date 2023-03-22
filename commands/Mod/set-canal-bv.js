const { PermissionFlagsBits } = require('discord.js');
const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    data: new Discord.SlashCommandBuilder()

        .setName("set-canal-bv")
        .setDescription("Seta o canal de boas vindas.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((channel) => channel.setName('canal').setDescription('mencione o canal').setRequired(true).addChannelTypes(Discord.ChannelType.GuildText)),
   

    async execute(interaction) {

        let channel = interaction.options.getChannel('canal')

        db.set('channelwelcomechannel', channel.id)

        let embedchannelbv = new Discord.EmbedBuilder()
            .setDescription(`**O Canal ${channel} foi setado para mensagem de boas vindas. <:awp_c_1:1065717312071684096>**`)
            .setColor('#000000')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

        interaction.reply({ embeds: [embedchannelbv], ephemeral: true })

    }
}