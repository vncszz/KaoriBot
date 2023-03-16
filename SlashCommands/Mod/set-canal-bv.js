const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {

    name: 'set-canal-bv',
    description: "[Moderação] •  Setar o canal de Boas Vindas.",
    options: [
        {
            name: 'canal',
            description: '[💼] • Mencione o canal',
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildText
            ],
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(dc.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            let channel = interaction.options.getChannel('canal')

            if (!channel.send)
                return interaction.reply({
                    content: `**${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
                    ephemeral: true,
                })

            await db.set('channelwelcome', { channel })

            let embedchannelbv = new Discord.EmbedBuilder()
                .setDescription({content: `**Canal ${channel} setado para boas vindas \✅**`})
                .setColor('#000000')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

            interaction.reply({ embeds: [embedchannelbv] })


        }

    }
}