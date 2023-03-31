const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const bot = require("../../bot.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("manage-money")
    .setDescription("Adicionar ou remover usuário!")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((sub) =>
      sub
        .setName("adicionar")
        .setDescription("Adicionar dinheiro para usuário(a)")
        .addNumberOption((number) =>
          number
            .setName("quantidade")
            .setDescription(
              "digite a quantidade que será adicionada ao usuário(a)"
            )
            .setMinValue(1)
            .setRequired(true)
        )
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("escolhar o(a) usuário(a)")
            .setRequired(true)
        )
    )
    .addSubcommand((sub) =>
      sub
        .setName("remover")
        .setDescription("Remover dinheiro de usuário(a)")
        .addNumberOption((number) =>
          number
            .setName("quantidade")
            .setDescription(
              "digite a quantidade que será removida ao usuário(a)"
            )
            .setMinValue(1)
            .setRequired(true)
        )
        .addUserOption((user) =>
          user
            .setName("user")
            .setDescription("escolhar o(a) usuário(a)")
            .setRequired(true)
        )
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { options } = interaction;

    const user = options.getUser("user");
    const quantidade = options.getNumber("quantidade");

    if (options.getSubcommand() === "adicionar") {
      await db.add(`carteira_${user.id}`, quantidade);

      interaction.reply({
        content: `Olá ${interaction.user}, você adicinou 🪙 \`${quantidade}\` Az Coins para o usuário(a): ${user}.`,
        ephemeral: true,
      });
    } else if (options.getSubcommand() === "remover") {
      await db.delete(`carteira_${user.id}`, quantidade);

      interaction.reply({
        content: `Olá ${interaction.user}, você removeu 🪙 \`${quantidade}\` Az Coins do usuário(a): ${user}.`,
        ephemeral: true,
      });
    }
  },
};
