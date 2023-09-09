const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const config = require("../../config.json");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave-server")
        .setDescription("Apenas Desenvolvedor."),

    async execute(interaction) {

        if (!interaction.member.permissions.has(config.perms.desenvolvedor)) {
            return interaction.reply({ content: `**Esse comando é apenas para meu desenvolvedor!**`, ephemeral: true });
        } else {

            const modal = new ModalBuilder()
                .setCustomId('modal_leaveGuild')
                .setTitle('ID do Servidor')

            const id_servidor = new TextInputBuilder()
                .setCustomId('id_servidor')
                .setLabel('Cole o ID aqui.')
                .setStyle(TextInputStyle.Short)

            const firstActionRow = new ActionRowBuilder().addComponents(id_servidor)

            modal.addComponents(firstActionRow)

            await interaction.showModal(modal);
        }

        client.once('interactionCreate', async interaction => {
            if (!interaction.isModalSubmit()) return;

            if (interaction.customId === 'modal_leaveGuild') {

                const guildID = interaction.fields.getTextInputValue('id_servidor')

                if (isNaN(guildID) || !guildID || guildID.length != 18) {
                    return interaction.reply(`Você deve indicar o id do servidor para sair.`);
                } else {
                    const guild = client.guilds.cache.get(guildID);
                    if (guild === undefined) return interaction.reply(`Seu bot não está nesses servidores.`)

                    if (!guild.available) return interaction.reply('Servidor indisponível, tente novamente mais tarde.')

                    client.guilds.cache.get(guildID).leave()
                        .then(x => {
                            interaction.reply({ content: `Acabei de sair do servidor \`${x.name}\`` }).catch(() => { })
                        })
                        .catch(err => { })
                }
            }
        })
    }

}

