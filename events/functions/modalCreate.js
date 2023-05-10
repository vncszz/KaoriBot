async function loadModals(client) {

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'partner') {

            //const attachment = `https://cdn.discordapp.com/attachments/1099757454130163753/1099880151392727060/145_Sem_Titulo_20221109075215.png`

            const user = interaction.fields.getTextInputValue('idPartner');
            const invite = interaction.fields.getTextInputValue('invitePartner');
            const idPartner = interaction.fields.getTextInputValue('idPartner');

            let canal = interaction.guild.channels.cache.get('1076316523540533309');
            let notificationId = '988493127331508224';

            await interaction.reply({
                content: 'Parceria enviada com sucesso <:awp_c_1:1065717312071684096>',
                ephemeral: true
            });

            await canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.tag}\`\nPing: <@&${notificationId}>` });

        }
    })
}

module.exports = {
    name: "modalcreate",
    loadModals
}