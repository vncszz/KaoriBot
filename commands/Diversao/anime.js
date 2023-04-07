const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anime")
    .setDescription("pesquise sobre um anime anime")
    .addStringOption((option) => option.setName("nome").setDescription("nome do anime que deseja pesquisar.").setRequired(true)),

  async execute(interaction) {

    const { client } = interaction;

    //const search = args.join(" ");
    let search = interaction.options.getString("nome");
    
    mal.getInfoFromName(search).then((data) => {
      const embed = new EmbedBuilder()
        .setAuthor({ name: `Resultado da pesquisa da Minha Lista de Animes para ${search}` })
        .setImage(data.picture)
        .setColor("#5865F2")
        .addFields(
          { name: 'English Title', value: `${data.englishTitle || "None!"}`, },
          { name: 'Japanese Title', value: `${data.japaneseTitle || "None!"}`, },
          { name: 'Type', value: `${data.type || "N/A!"}`, },
          { name: 'Episodes', value: `${data.episodes || "N/A!"}`, },
          { name: 'Score', value: `${data.score || "N/A!"}`, },
          { name: 'Rating', value: `${data.rating || "N/A!"}`, },
          { name: 'Aired', value: `${data.aired || "N/A!"}`, },
          { name: 'Scored by', value: `${data.scoreStats || "N/A!"}`, },
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