const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'set-logs-ticket',
    description: "[🚫] • Setar o canal de logs do Ticket.",
    options: [
      {
        name: 'canal',
        description: 'Mencione o canal',
        type: Discord.ApplicationCommandOptionType.Channel,
        channelTypes: [
          Discord.ChannelType.GuildText
        ],
        required: true,
      }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**<:awp_c_0:1065717278940856390> Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            
            let channel = interaction.options.getChannel('canal')

            if (!channel.send)
            return interaction.reply({
                content: `**<:awp_c_0:1065717278940856390> ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
                ephemeral: true,
            })

            await db.set('channelLogTicket', {channel})
            
          let embedLogTicket = new Discord.EmbedBuilder()
           .setDescription(`**O Canal ${channel} foi setado para os transcript/logs do ticket. <:awp_c_1:1065717312071684096>**`)
           .setColor('#000000')
           .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
     
           interaction.reply({ embeds: [embedLogTicket], ephemeral: true })
            
        }

 

    }
} 