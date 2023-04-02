const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");
const bot = require("../../bot.json");
const ms = require("ms");

module.exports = {
  data: new discord.SlashCommandBuilder()
    .setName("trabalhar")
    .setDescription("Trabalhe pra ganhar moedas")
    .addStringOption((option) =>
      option
        .setName("emprego")
        .setDescription("Selecione um emprego")
        .addChoices(
          {
            name: "Feiticeiro",
            value: "JobFeiticeiro",
          },
          {
            name: "Alquimista",
            value: "jobAlquimista",
          },
          {
            name: "Aventureiro",
            value: "jobAventureiro",
          },
          {
            name: "Cozinheiro",
            value: "jobCozinheiro",
          },
          {
            name: "Lenhador",
            value: "jobLenhador",
          },
          {
            name: "Mercenário",
            value: "jobMercenário",
          },
          {
            name: "Ferreiro",
            value: "JobFerreiro",
          },
        )
        .setRequired(true)
    ),
  /**
   * @param {discord.Client} client
   * @param {discord.CommandInteraction} interaction
   */
  async execute(interaction) {

    const { client } = interaction;

    let amount = Math.floor(Math.random() * 5000) + 500;
    let emprego = interaction.options.getString("emprego");

    let data;
    try {
      data = await schema.findOne({
        userId: interaction.user.id,
      });

      if (!data) {
        data = await schema.create({
          userId: interaction.user.id,
          guildId: interaction.guild.id,
        });
      }
    } catch (err) {
      console.log(err);
      await interaction.reply({
        content: "Ocorreu um erro ao executar esse comando...",
        ephemeral: true,
      });
    }

    let timeout = ms("1h")

    if (timeout - (Date.now() - data.workTimeout) > 0) {
      let timeLeft = ms(timeout - (Date.now() - data.workTimeout));

      await interaction.reply({
        content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para trabalhar novamente.`, ephemeral: true
      });
    } else {
      data.workTimeout = Date.now();
      data.wallet += amount * 1;
      await data.save();

      if (emprego === 'JobFeiticeiro') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('🧙‍♂️ Feiticeiro')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091449980545404998/Personagens-de-Animes-Satoru-Gojo.png')
          .setDescription(`Você Acabou de preparar algumas poções, elixires e encantamentos!\nUma bruxa comprou de você e lhe pagou \`${amount.toLocaleString()}\` AzCoins 🪙`)
          .setColor(bot.config.cor)

        await interaction.reply({ embeds: [workEmbed] })
      }
      if (emprego === 'jobAlquimista') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('🧪 Alquimista')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091450858543251456/legiao_2s3NHxRWDe0M.png')
          .setDescription(`Você trabalhou dia e noite em seu laboratório, experimentando diferentes combinações de ingredientes na busca pela fórmula perfeita.\nUm cliente comprou seu estoque por \`${amount.toLocaleString()}\` AzCoins 🪙`)
          .setColor('#D53030')

        await interaction.reply({ embeds: [workEmbed] })

      }
      if (emprego === 'jobAventureiro') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('🗡️🛡️🐉 Aventureiro')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091452092734001295/latest.png')
          .setDescription(`Você acaba de iniciar uma nova jornada!\nE ao entrar em uma dungeon encontrou \`${amount.toLocaleString()}\` AzCoins 🪙`)
          .setColor('White')

        await interaction.reply({ embeds: [workEmbed] })

      }
      if (emprego === 'jobCozinheiro') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('👨‍🍳 Cozinheiro')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091453411435741314/os-10-melhores-animes-de-culinaria-de-todos-os-tempos.png')
          .setDescription(`Um cliente amou sua nova receita e lhe deu uma gorjeta de \`${amount.toLocaleString()}\` AzCoins 🪙`)
          .setColor('#F4691F')

        await interaction.reply({ embeds: [workEmbed] })

      }
      if (emprego === 'jobLenhador') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('🪚 Lenhador')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091454017328136262/chainsaw-man-season-1-review_tqb1.png')
          .setDescription(`Você trabalhou como lenhador e recebeu \`${amount.toLocaleString()}\` Az Coins 🪙`)
          .setColor('DarkRed')

        await interaction.reply({ embeds: [workEmbed] })

      }
      if (emprego === 'jobMercenário') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('🗡️ Mercenário')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091454847716429864/cyberpunk-mercenarios-730x365.png')
          .setDescription(`Você e sua gang eliminou uns inimigos e como recompensa ganharam \`${amount.toLocaleString()}\` Az Coins 🪙`)
          .setColor('#F8F243')

        await interaction.reply({ embeds: [workEmbed] })

      }
      if (emprego === 'jobFerreiro') {

        const workEmbed = new discord.EmbedBuilder()
          .setTitle('⚔️ Ferreiro')
          .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091455634823716945/demon_slayer_kimetsu_no_yaiba_to_the_swordsmith_village_brasil__2sy5z2qg-1210x544.png')
          .setDescription(`Você consertou a espada de uma espadachim e como recompensa ganhou \`${amount.toLocaleString()}\` Az Coins 🪙`)
          .setColor('#22A028')

        await interaction.reply({ embeds: [workEmbed] })

      }
    }
  }
}
