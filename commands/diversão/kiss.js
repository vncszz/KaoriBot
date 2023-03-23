const { ChatInputCommandInteraction, ButtonStyle } = require("discord.js");
const { execute } = require("./ship");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('kiss')
        .setDescription('Beije algum membro')
        .addUserOption((user) => user.setName('user').setDescription('Mencione o membro').setRequired(true))
        .addStringOption((declaration) => declaration.setName('declaração').setDescription('faça uma declaração de amor').setRequired(false)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')
        let declaration = interaction.options.getString('declaração');

        var lista1 = [
            'https://imgur.com/II1bakc.gif',
            'https://imgur.com/MzAjNdv.gif',
            'https://imgur.com/eKcWCgS.gif',
            'https://imgur.com/3aX4Qq2.gif',
            'https://imgur.com/uobBW9K.gif'
        ];

        var lista2 = [
            'https://imgur.com/3jzT5g6.gif',
            'https://imgur.com/VrETTlv.gif',
            'https://imgur.com/FozOXkB.gif',
            'https://imgur.com/7GhTplD.gif',
            'https://imgur.com/B6UKulT.gif'
        ];

        var random1 = lista1[Math.floor(Math.random() * lista1.length)];
        var random2 = lista2[Math.floor(Math.random() * lista2.length)];

        const embed = new Discord.EmbedBuilder()
            .setDescription(`<:mas:1077342636999975093> **${interaction.user} Beijou ${user} \n\n ${declaration || `💞`}**`)
            .setImage(`${random1}`)
            .setColor("#c5a0c1")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('beijar')
                    .setLabel('Retribuir')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`<:mas:1077342636999975093> **${user} Beijou ${interaction.user} de volta!**`)
            .setColor("#c5a0c1")
            .setImage(`${random2}`)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {
            const filter = i => i.customId === 'beijar' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === 'beijar') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })

    }
}