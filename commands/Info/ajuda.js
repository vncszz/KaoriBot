const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require(`discord.js`);
const Discord = require(`discord.js`);
const fs = require(`fs`);
const bot = require('../../bot.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ajuda")
        .setDescription("Mostra Meus Comandos."),

    async execute(interaction) {

        const { client } = interaction;

        const cmp = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder().setCustomId("Menu").addOptions([
                {
                    label: "Menu",
                    description: "Aba Inicial.",
                    value: "Menu_01",
                    emoji: "🏠",
                },
                {
                    label: "Informações",
                    description: "Comandos de Informação.",
                    value: "info_1",
                    emoji: "🛰️",
                },
                {
                    label: "Moderação",
                    description: "Comandos de Moderação.",
                    value: "mod",
                    emoji: "💻",
                },
                {
                    label: "Diversão",
                    description: "Comandos de Diversão.",
                    value: "div",
                    emoji: "😉",
                },
                {
                    label: "Economia",
                    description: "Comandos de Economia.",
                    value: "eco",
                    emoji: "🪙",
                }
            ]).setPlaceholder('👋 Selecione aqui')
        );
        const user = interaction.user;

        const icon = client.user.displayAvatarURL()

        const embed = new EmbedBuilder()
            .setTitle("Painel de Ajuda | Naomi™")
            .setThumbnail(icon)
            .setColor(bot.config.cor)
            .setDescription(`**Seleciona as Categorias Abaixo.**`)

        let mensaje = await interaction.reply({
            embeds: [embed],
            components: [cmp],
        });

        const filtro = (i) => i.user.id === interaction.user.id;
        user.id;

        let collector = interaction.channel.createMessageComponentCollector({
            filter: filtro,
        });

        const embed1 = new EmbedBuilder()
            .setTitle("Comandos de Informação | Naomi™")
            .setThumbnail(icon)
            .setDescription("`Lista de Comandos:` \n\n**/userinfo** \n**/afk** \n**/server-info** \n**/cleardm** \n**/help** \n**/avaliar** \n**.rank**\n**.top**")
            .setTimestamp()
            .setColor(bot.config.cor);

        const embed2 = new EmbedBuilder()
            .setTitle("Comandos de Moderação | Naomi™")
            .setThumbnail(icon)
            .setDescription(
                "`Lista de Comandos:` \n\n**/clear**\n**/say** \n**.ban** \n**.unban** \n**/set-canal-bv** \n**/parceria** \n**/ticket**\n"
            )
            .setTimestamp()
            .setColor('DarkRed')

        const embed3 = new EmbedBuilder()
            .setTitle("Comandos de Diversão | Naomi™")
            .setThumbnail(icon)
            .setDescription("`Lista de Comandos:` \n\n**/hug** \n**/kiss** \n**/slap** \n**/ship**\n")
            .setTimestamp()
            .setColor(bot.config.cor);

        const embed4 = new EmbedBuilder()
            .setTitle("Comandos de Economia | Naomi™")
            .setThumbnail(icon)
            .setDescription("`Lista de Comandos:` \n\n**/pay** \n**/daily** \n**/work** \n**/carteira**\n**/shop**\n**/inventario**\n**/apostar**")
            .setTimestamp()
            .setColor(bot.config.cor);


        collector.on("collect", async (i) => {
            if (i.values[0] === "Menu_01") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "info_1") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed1], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "mod") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed2], components: [cmp] });
            }
        });

        collector.on("collect", async (i) => {
            if (i.values[0] === "div") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed3], components: [cmp] });
            }
        });
        collector.on("collect", async (i) => {
            if (i.values[0] === "eco") {
                await i.deferUpdate();
                i.editReply({ embeds: [embed4], components: [cmp] });
            }
        });

    },
};