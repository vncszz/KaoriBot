const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

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

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**<:awp_c_0:1065717278940856390> Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            let Categoria = interaction.options.getChannel("categoria")




            await db.set('Categoria', { Categoria })

            let embedCategoriaSet = new Discord.EmbedBuilder()
                .setDescription(`**Os Tickets agora irão ser criados na categoria ${Categoria} <:awp_c_1:1065717312071684096>**`)
                .setColor('#000000')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

            interaction.reply({ embeds: [embedCategoriaSet],  ephemeral: true })

        }





    }
} 