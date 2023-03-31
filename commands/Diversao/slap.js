const { Client, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { execute } = require("./kiss");
const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("slap")
        .setDescription("dê um tapa em alguém")
        .addUserOption((user) => user.setName("user").setDescription("mencione o usuário que deseja bater.").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')

        const body = await fetch(`https://api.waifu.pics/sfw/slap`).then((res) => res.json());

        const body2 = await fetch(`https://api.waifu.pics/sfw/slap`).then((res) => res.json());

        const embed = new EmbedBuilder()
            .setDescription(`**${interaction.user} deu um tapa em ${user}.**`)
            .setImage(body.url)
            .setColor("#c5a0c1")

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('tapa')
                    .setLabel('Retribuir')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(false)

            )

        const embed1 = new EmbedBuilder()
            .setDescription(`**${user} Devolveu o tapa de ${interaction.user}.**`)
            .setColor("#c5a0c1")
            .setImage(body2.url)

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === 'tapa' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {
                if (i.customId === 'tapa') {
                    i.reply({ embeds: [embed1] })
                }
            });

        })

    }
}