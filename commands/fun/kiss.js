const { ChatInputCommandInteraction, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("kiss")
        .setDescription("beije alguém")
        .addUserOption((user) => user.setName("user").setDescription("mencione o usuário que deseja beijar.").setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')

        const body = await fetch(`https://api.waifu.pics/sfw/kiss`).then((res) => res.json());

        const body2 = await fetch(`https://api.waifu.pics/sfw/kiss`).then((res) => res.json());

        const embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um beijo em ${user}.**`)
            .setImage(body.url)
            .setColor("#c5a0c1")

        const button = new Discord.ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('beijar')
                    .setLabel('😊 Retribuir')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(false)

            )

        const embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o beijo de ${interaction.user}.**`)
            .setColor("#c5a0c1")
            .setImage(body2.url)

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