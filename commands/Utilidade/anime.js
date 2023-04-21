const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder, SlashCommandBuilder } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("anime")
        .setDescription("veja as informações de um anime.")
        .addStringOption((option) => option.setName("nome").setDescription("nome do anime que deseja ver.").setRequired(true)),

    async execute(interaction) {

        const { client } = interaction;

        const search = interaction.options.getString("nome")

        mal.getInfoFromName(search).then((data) => {
            const embed = new EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setAuthor({ name: `Resultado da pesquisa para ${search}` })
                .setImage(data.picture)
                .setColor('DarkPurple')
                .addFields(
                    { name: 'Nome em Inglês', value: `${data.englishTitle || "None!"}`, },
                    { name: 'Nome em Japonês', value: `${data.japaneseTitle || "None!"}`, },
                    { name: 'Tipo', value: `${data.type || "N/A!"}`, },
                    { name: 'Episódios', value: `${data.episodes || "N/A!"}`, },
                    { name: 'Avaliação', value: `${data.score || "N/A!"}`, },
                    { name: 'Categoria', value: `${data.rating || "N/A!"}`, },
                    { name: 'Exibido', value: `${data.aired || "N/A!"}`, },
                    { name: 'Avaliado por', value: `${data.scoreStats || "N/A!"}`, },
                )
                .setFooter({
                    text: `Pedido por ${interaction.user.username}`,
                    iconURL: interaction.user.displayAvatarURL({
                        dynamic: true,
                        format: "png",
                        size: 2048,
                    }),
                })
                .setTimestamp();
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setURL(data.url)
                        .setLabel("Veja mais")
                );
            return interaction.reply({ embeds: [embed], components: [row] });
        })

    }
}