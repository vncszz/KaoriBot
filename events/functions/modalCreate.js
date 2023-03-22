async function loadModals(client) {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'partner') {

            const invite = interaction.fields.getTextInputValue('invitePartner')
            const idPartner = interaction.fields.getTextInputValue('idPartner')

            let canal = interaction.guild.channels.cache.get('1076316523540533309') // id do canal
            let notificationId = '988493127331508224' //id do cargo de notificação

            await interaction.reply({
                content: `Parceria Enviada com sucesso. <:awp_c_1:1065717312071684096>`, ephemeral: false
            })

            canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.username}\`\nPing: <@&${notificationId}>` });
        }
    })
}

module.exports = {
    loadModals
}