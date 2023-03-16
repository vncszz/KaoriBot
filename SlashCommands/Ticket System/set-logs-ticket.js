const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { PermissionsBitField: { Flags } } = require('discord.js')

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

        if (!interaction.member.permissions.has(Flags.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            
            let channel = interaction.options.getChannel('canal')

            if (!channel.send)
            return interaction.reply({
                content: `**❌ - ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
                ephemeral: true,
            })

            await db.set('channelLogTicket', {channel})
            
          let embedLogTicket = new Discord.EmbedBuilder()
           .setDescription(`**Canal ${channel} setado para Logs de Tickets! \✅**`)
           .setColor('Random')
           .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}`})
     
           interaction.reply({ embeds: [embedLogTicket] })
            
        }

 

    }
} 