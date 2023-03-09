const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: `[📷] • Veja o seu avatar ou de outro alguém`,
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            type: ApplicationCommandOptionType.User,
            description: 'mencione a quem deseja ver o avatar',
            require: false,
        },
    ],
    run: async (client, interaction) => {

        let userMention = interaction.options.getUser('user');
        if (!userMention) {
            userMention = interaction.user;
        }
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
                    .setDescription(':error: **|** Nenhum avatar encontrado.')
                ], ephemeral: true
            })
        }
    },
}