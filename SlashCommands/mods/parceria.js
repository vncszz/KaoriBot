const { TextInputStyle } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
    name: "parceria", // Coloque o nome do comando
    description: "[🚀] • Faça uma parceria", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
            interaction.reply({content: `Você não possui permissão para utilizar este comando.`, ephemeral: true});
        } else {

            const modal = new Discord.ModalBuilder()
                .setCustomId('partner')
                .setTitle('Parceria')

            const idPartner = new Discord.TextInputBuilder()
                .setCustomId('idPartner')
                .setLabel('Insira o ID aqui')

                .setStyle(TextInputStyle.Short)

            const invitePartner = new Discord.TextInputBuilder()
                .setCustomId('invitePartner')
                .setLabel('Insira o convite aqui')

                .setStyle(TextInputStyle.Paragraph)

            const firstActionRow = new Discord.ActionRowBuilder().addComponents(idPartner);
            const secondActionRow = new Discord.ActionRowBuilder().addComponents(invitePartner)

            modal.addComponents(firstActionRow, secondActionRow)
            await interaction.showModal(modal);

            client.on('interactionCreate', async interaction => {
                if (!interaction.isModalSubmit()) return;

                if (interaction.customId === 'partner') {

                    const invite = interaction.fields.getTextInputValue('invitePartner')
                    const idPartner = interaction.fields.getTextInputValue('idPartner')

                    let canal = interaction.guild.channels.cache.get('1076316523540533309') // id do canal
                    //let notificationId = '988493127331508224' //id do cargo de notificação

                    await interaction.reply({
                        content: `Parceria Enviado com sucesso <:corretoaz:1076576186962026618>`, ephemeral: true
                    })

                    canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.username}\``});
                }
            })
        }

    }
}

//\nPing: <@&${notificationId}>