const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription(`[📷] • Veja o seu avatar ou de outro alguém.`)
    .addUserOption((user) => user .setName("user").setDescription("mencione a quem deseja ver o avatar").setRequired(false)),

    async (interaction) {

        let userMention = interaction.options.getUser('user') || interaction.user;
        let avatar = userMention.avatarURL({ format: 'png', dynamic: true, size: 2048 });
        if (avatar) {
            const embed = new EmbedBuilder()
                .setTitle(`${userMention.username}`)
                .setImage(avatar)
                .setColor('#000000')

            const button = new ActionRowBuilder()
                .addComponents([
                    new ButtonBuilder()
                        .setLabel('Baixar')
                        .setURL(avatar)
                        .setStyle(5)
                ])

            interaction.reply({
                embeds: [embed],
                components: [button]
            })
        } else {
            interaction.reply({
                embeds: [new EmbedBuilder()
                    .setColor('#bd6930')
                    .setDescription('<:awp_c_0:1065717278940856390> **|** Nenhum avatar encontrado.')
                ], ephemeral: true
            })
        }
    },
}