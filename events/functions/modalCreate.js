const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { EmbedBuilder } = require("discord.js")
const bot = require("../../bot.json")

async function loadModals(client) {

    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'partner') {

            let Canal_log = interaction.guild.channels.cache.get("1107094725581881454")
            const invite = interaction.fields.getTextInputValue('invitePartner');
            const idPartner = interaction.fields.getTextInputValue('idPartner');

            let canal = interaction.guild.channels.cache.get('1076316523540533309');
            let notificationId = '988493127331508224';

            await db.add(`Parcerias_${interaction.user.id}`, 1) || user.id;

            let messageCount = await db.get(`Parcerias_${interaction.user.id}`) || user.id;

            await interaction.reply({
                content: 'Parceria enviada com sucesso <:awp_c_1:1065717312071684096>',
                ephemeral: false
            });

            await canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.tag}\`\nPing: <@&${notificationId}>` });

            await Canal_log.send({
                embeds: [
                    new EmbedBuilder()
                        .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
                        .setColor(bot.config.cor)
                        .setDescription(`O Promotor ${interaction.user} realizou 1 parceria.\n\nRepresentante: <@${idPartner}>\n\nTotal: \`${messageCount}\` Data: <t:${~~(interaction.createdAt / 1000)}:f>`)
                        .setTimestamp(new Date)
                        .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                ]
            })
        }
    })
}

module.exports = {
    name: "modalcreate",
    loadModals
}