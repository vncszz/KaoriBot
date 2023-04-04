const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("add-coins")
    .setDescription("Adicione AzCoins na carteira de alguem")
    .addUserOption((option) =>
      option.setName("user").setDescription("Selecione o usuário").setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription("Quanto você deseja adiconar?")
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(interaction) {

    const { client } = interaction;

    const permission = interaction.member.permissions.has(
      discord.PermissionFlagsBits.ManageGuild
    );
    let user = interaction.options.getUser("user");
    let amount = interaction.options.getInteger("quantidade");

    let data;
    try {
      data = await schema.findOne({
        userId: user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "Ocorreu um erro ao executar este comando...",
        ephemeral: true,
      });
    }

    if (!permission) {
      await interaction.reply({
        content: "Você não tem permissão pra utilizar esse comando...",
        ephemeral: true,
      });
    } else {
      data.bank += amount * 1;
      await data.save();

      const addcoinsEmbed = new discord.EmbedBuilder()
        .setColor("#0155b6")
        .setDescription(
          `💵 Você adicionou **${amount.toLocaleString()}** AzCoins na carteira de **${user.username}**`
        );

      await interaction.reply({
        embeds: [addcoinsEmbed], ephemeral: true,
      });
    }
  },
};
