const Discord = require("discord.js");

module.exports = {
    name: "painel-ticket",
    description: '[🚫] • Envie o painel de tikcet.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "chat",
            description: "Mencione um canal.",
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator))
            return interaction.reply({
                content: `**❎ ${interaction.user}, Você precisa da permissão \`Administrador\` para usar este comando!**`,
                ephemeral: true,
            }); else {

            let chat = interaction.options.getChannel("chat")

            if (!chat.send)
                return interaction.reply({
                    content: `**❎ ${interaction.user}, Você provavelmente selecionou um canal de voz ou categoria. Por favor selecione um canal de texto.**`,
                    ephemeral: true,
                })

            let rowTicket = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.StringSelectMenuBuilder()
                        .setCustomId('select2')
                        .setPlaceholder('Selecione uma Opção Aqui')
                        .addOptions(
                            {
                                label: 'Suporte Ticket',
                                description: 'Clique aqui para Denúncias ou Suporte Geral.',
                                emoji: '<:distintivoblack:1083534596949426276>',
                                value: 'ticket',
                            },
                            {
                                label: ' Dúvida',
                                description: 'Clique aqui caso haja alguma dúvida.',
                                emoji: '<:perguntablack:1083534633578287197>',
                                value: 'duvida',
                            },

                        ),

                )


            let embedTicket = new Discord.EmbedBuilder()
                .setTitle(`\🎟 - Suporte Via Ticket`)
                .setDescription(`*Deseja Suporte com nossa staff?\nSelecione uma opção para entrar em contato!*`)
                .setColor('White')
                .setFooter({ text: `©Animes Zero™ ・ Todos os Direitos Reservados`})
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1076243158452674580/175_Sem_Titulo_20221121132849.png')


            interaction.reply({ content: `✅ Feito! Ticket enviado no canal ${chat}!`, ephemeral: true })
            chat.send({ components: [rowTicket], embeds: [embedTicket] })



        }

    }
}