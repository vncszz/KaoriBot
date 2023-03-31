const { ChatInputCommandInteraction, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("hug")
        .setDescription("abraçe alguém.")
        .addUserOption((user) => user.setName("user").setDescription("mencione o usuário que deseja abraçar.").setRequired(true)),
    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        let user = interaction.options.getUser('user')

        const body = await fetch(`https://api.waifu.pics/sfw/hug`).then((res) => res.json());

        const body2 = await fetch(`https://api.waifu.pics/sfw/hug`).then((res) => res.json());

        let embed = new Discord.EmbedBuilder()
            .setDescription(`**${interaction.user} Deu um abraço em ${user}.**`)
            .setImage(body.url)
            .setColor("#c5a0c1")

        let button = new Discord.ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('abracar')
                    .setLabel('Retribuir')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(false)

            )

        let embed1 = new Discord.EmbedBuilder()
            .setDescription(`**${user} Retribuiu o abraço de ${interaction.user}.**`)
            .setColor("#c5a0c1")
            .setImage(body2.url);

        interaction.reply({ embeds: [embed], components: [button] }).then(() => {

            const filter = i => i.customId === 'abracar' && i.user.id === user.id;
            const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });

            collector.on('collect', async i => {

                if (i.customId === 'abracar') {
                    i.reply({ embeds: [embed1] })
                }
            });
        })

    }
}