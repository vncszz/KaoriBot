const Discord = require('discord.js');

async function loadModals(client) {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'partner') {

            const invite = interaction.fields.getTextInputValue('invitePartner')
            const idPartner = interaction.fields.getTextInputValue('idPartner')

            let canal = interaction.guild.channels.cache.get('1076316523540533309') // id do canal
            let notificationId = '988493127331508224' //id do cargo de notificação

            const embed = new Discord.EmbedBuilder()
            .setColor('White')
            .setDescription(`${interaction.user} Sua parceria foi enviada com sucesso <:awp_c_1:1065717312071684096>`)
            .setTimestamp(new Date())

            await interaction.reply({
                embeds: [embed],
                ephemeral: false
            })

            canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.username}\`\nPing: <@&${notificationId}>` });
        }
    })
}

module.exports = {
    loadModals
}