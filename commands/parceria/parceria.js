const { TextInputStyle, ModalBuilder, TextInputBuilder, ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js")
const bot = require("../../bot.json");
const client = require("../../index");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("parceria")
        .addUserOption((option) => option.setName("rep").setDescription("Cole o ID do representante ou mencione ele aqui.").setRequired(true))
        .setDescription("Use para fazer parcerias."),

    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) {
            interaction.reply({ content: `Você não tem o cargo pra isso`, ephemeral: true });
        } else {

            const modal = new ModalBuilder()
                .setCustomId('partner')
                .setTitle('Parceria ✍️')

            const invitePartner = new TextInputBuilder()
                .setCustomId('invitePartner')
                .setLabel('cole o convite do representante aqui.')
                .setStyle(TextInputStyle.Paragraph)

            const secondActionRow = new ActionRowBuilder().addComponents(invitePartner)

            let member = interaction.options.getUser("rep") || member.id;

            modal.addComponents(secondActionRow)
            await interaction.showModal(modal);

            //const user = member.id;
            //await db.set(`Parcerias_${member.id}`, { member })

            client.once("interactionCreate", async interaction => {
                if (!interaction.isModalSubmit()) return;

                if (interaction.customId === 'partner') {

                    let invite = interaction.fields.getTextInputValue('invitePartner');
                    let canal = interaction.guild.channels.cache.get('1076316523540533309');
                    let notificationId = '988493127331508224';

                    await interaction.reply({
                        content: `Parceria enviada a ${canal}`,
                        ephemeral: false
                    });

                    const embed_user = new EmbedBuilder()
                        .setColor("#488156")
                        .setImage("https://cdn.discordapp.com/attachments/1092575742455447732/1113165355616047184/D4dj_Hi_GIF_-_D4dj_Hi_Rinku_-_Discover__Share_GIFs.gif")
                        .setAuthor({ name: `${interaction.guild.name}`, url: interaction.guild.iconURL() })
                        .setDescription(`Obrigado por fazer uma parceria com nosso servidor 🥰💖\ncaso você saia do servidor ou seu convite expire, a parceria será cancelada. Podendo renovar a qualquer momento!`)
                        .setFooter({ text: `Promotor: ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })


                    try {
                        member.send({ embeds: [embed_user] })
                    } catch (err) {
                        console.log(`Erro ao enviar DM: ${err}`)
                    }

                    await db.add(`Parcerias_${member.id}`, 1)

                    //let attachment = `https://media.discordapp.net/attachments/1076242922971869214/1076244038983884870/145_Sem_Titulo_20221109075215.png?width=1025&height=415`

                    await canal.send({
                        content: `${invite}\nPing: <@&${notificationId}>\nRep: ${member}\nPromotor: \`${interaction.user.username}\``
                    }).catch((err) => {
                        console.log(`${err}`)
                    })

                }
            })
        }


    }
}