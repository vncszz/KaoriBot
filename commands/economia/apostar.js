const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("aposta")
    .setDescription("Apostar moedas com usuário(a)!")
    .addNumberOption((number) =>
      number
        .setName("quantidade")
        .setDescription(
          "digite a quantidade que será apostda com o(a) usuário(a)"
        )
        .setMinValue(1)
        .setRequired(true)
    )
    .addUserOption((user) =>
      user
        .setName("usuário")
        .setDescription("escolhar o(a) usuário(a)")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;

    const user = options.getUser("usuário");
    const quantidade = options.getNumber("quantidade");

    const carteira_user = await db.get(`carteira_${user.id}`);
    const carteira_sua = await db.get(`carteira_${interaction.user.id}`);

    if (quantidade > carteira_sua) {
      interaction.reply({ content: `Você não possui 🪙 \`${quantidade}\`  Az Coins para apostar.`, ephemeral: true })
    } else if (quantidade > carteira_user) {
      interaction.reply({ content: `O usuário ${user} não possui 🪙 \`${quantidade}\` Az Coins para apostar.`, ephemeral: true })
    } else {
      let competidores = [user, interaction.user];
      let vencedor =
        competidores[Math.floor(Math.random() * competidores.length)];

      const embed = new EmbedBuilder()
        .setColor("White")
        .setDescription(
          `Olá ${user}, o usuário ${interaction.user} deseja apostar 🪙 \`${quantidade}\` Az Coins com você!\nClique no menu abaixo para aceitar a aposta.`
        );

      const menu = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Success)
          .setLabel("Aceitar aposta!")
          .setEmoji("💲")
          .setCustomId(`aceitar`)
      );

      interaction
        .reply({ content: `${user}`, embeds: [embed], components: [menu] })
        .then(() => {
          let filtro = (msg) =>
            msg.customId === `aceitar` && msg.user.id === user.id;
          let coletor = interaction.channel.createMessageComponentCollector({
            filter: filtro,
            max: 1,
          });

          coletor.on("collect", (c) => {
            if (vencedor.id === user.id) {
              c.reply(
                `Parabéns ${vencedor}! Você ganhou 🪙 \`${quantidade}\` Az Coins.`
              ).then(() => {
                setTimeout(() => {
                  c.deleteReply();
                }, 15000)
              });
              db.add(`carteira_${user.id}`, quantidade);
              db.sub(`carteira_${interaction.user.id}`, quantidade);
            } else if (vencedor.id === interaction.user.id) {
              c.reply(
                `Parabéns ${vencedor}! Você ganhou 🪙 \`${quantidade}\` Az Coins.`
              ).then(() => {
                setTimeout(() => {
                  c.deleteReply();
                }, 15000)
              });
              db.add(`carteira_${interaction.user.id}`, quantidade);
              db.sub(`carteira_${user.id}`, quantidade);
            }
          });

          coletor.on("end", () => {
            interaction.editReply({
              components: [
                new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                    .setDisabled(true)
                    .setStyle(ButtonStyle.Success)
                    .setLabel("Aceitar aposta!")
                    .setEmoji("💲")
                    .setCustomId(`aceitar` + interaction.id)
                ),
              ],
            });
          });
        });
    }
  },
};
