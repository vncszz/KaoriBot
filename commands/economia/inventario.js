const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("inventario")
    .setDescription("Veja seu inventario!")
    .addUserOption((user) => user.setName("usuário").setDescription("escolhar o usuário(a)").setRequired(false)),
  /**
   * 
   * @param {ChatInputCommandInteraction} interaction  
   */
  async execute(interaction) {

    const { options } = interaction;

    const user = options.getUser("usuário") || interaction.user;

    let pizza = await db.get(`pizza_${user.id}`);
    if (pizza === null) pizza = 0;

    let batata_frita = await db.get(`batata_frita_${user.id}`);
    if (batata_frita === null) batata_frita = 0;

    let hamburguer = await db.get(`hamburguer_${user.id}`);
    if (hamburguer === null) hamburguer = 0;

    let suco = await db.get(`suco_${user.id}`);
    if (suco === null) suco = 0;

    let coca_cola = await db.get(`coca_cola_${user.id}`);
    if (coca_cola === null) coca_cola = 0;

    let vinho = await db.get(`vinho_${user.id}`);
    if (vinho === null) vinho = 0;

    let cafe = await db.get(`cafe_${user.id}`);
    if (cafe === null) cafe = 0;

    let pao = await db.get(`pao_${user.id}`);
    if (pao === null) pao = 0;

    let bolo = await db.get(`bolo_${user.id}`);
    if (bolo === null) bolo = 0;

    const embed = new EmbedBuilder()
      .setTitle("🎒 Inventário")
      .setColor("White")
      .setDescription(
        `Olá ${interaction.user}, veja abaixo o inventário do usuário: ${user}`
      )
      .setFields(
        { name: "🍕 Pizza", value: `\`${pizza}\``, inline: true },
        { name: "🍟 Batata Frita", value: `\`${batata_frita}\``, inline: true },
        { name: "🍔 Hambúrguer", value: `\`${hamburguer}\``, inline: true },

        { name: "🍹 Suco", value: `\`${suco}\``, inline: true },
        { name: "🥤 Coca-Cola", value: `\`${coca_cola}\``, inline: true },
        { name: "🍷 Vinho", value: `\`${vinho}\``, inline: true },

        { name: "☕ Café", value: `\`${cafe}\``, inline: true },
        { name: "🍞 Pão", value: `\`${pao}\``, inline: true },
        { name: "🍰 Bolo", value: `\`${bolo}\``, inline: true }
      );

    interaction.reply({ embeds: [embed], ephemeral: true })

  },
};