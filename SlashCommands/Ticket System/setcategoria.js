const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { PermissionsBitField: { Flags } } = require('discord.js')


module.exports = {
    name: 'set-categoria-ticket',
    description: "[🚫] • Setar a categoria de Tickets (CATEGORIA).",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "categoria",
            description: "Escolha a categoria de ticket.",
            type: Discord.ApplicationCommandOptionType.Channel,
            channelTypes: [
                Discord.ChannelType.GuildCategory,
            ],
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Flags.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            let Categoria = interaction.options.getChannel("categoria")




            await db.set('Categoria', { Categoria })

            let embedCategoriaSet = new Discord.EmbedBuilder()
                .setDescription(`**Categoria ${Categoria} setado para Categoria de tickets \✅**`)
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

            interaction.reply({ embeds: [embedCategoriaSet] })

        }





    }
} 