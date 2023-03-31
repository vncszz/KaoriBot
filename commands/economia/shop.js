const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  StringSelectMenuBuilder,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const bot = require("../../bot.json")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("shop")
    .setDescription("Veja os itens disponíveis para comprar no shopping!"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {

    if (!interaction.member.roles.cache.get(bot.config.naomiAcess)) {
      interaction.reply({ content: `Nosso shop está em desenvolvimento ainda..` })
    }
    else {
      const { } = interaction;

      const embed = new EmbedBuilder()
        .setTitle("🛒 | Lojinha")
        .setColor("White")
        .setDescription(
          `Olá ${interaction.user}, veja abaixo os produtos disponíveis para compra no shopping`
        )
        .setFields(
          { name: "🍕 Pizza", value: "200 Az Coins", inline: true },
          { name: "🍟 Batata Frita", value: "300 Az Coins", inline: true },
          { name: "🍔 Hambúrguer", value: "500 Az Coins", inline: true },

          { name: "🍹 Suco", value: "200 Az Coins", inline: true },
          { name: "🥤 Coca-Cola", value: " 300 Az Coins", inline: true },
          { name: "🍷 Vinho", value: "500 Az Coins", inline: true },

          { name: "☕ Café", value: "200 Az Coins", inline: true },
          { name: "🍞 Pão", value: " 300 Az Coins", inline: true },
          { name: "🍰 Bolo", value: "500 Az Coins", inline: true }
        );

      const menu = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("menu")
          .setPlaceholder("👆 Escolhar Aqui!!!")
          .setOptions(
            { label: "Pizza", emoji: "🍕", value: "pizza" },
            { label: "Batata Frita", emoji: "🍟", value: "batata_frita" },
            { label: "Hambúrguer", emoji: "🍔", value: "hamburguer" },

            { label: "Suco", emoji: "🍹", value: "suco" },
            { label: "Coca Cola", emoji: "🥤", value: "coca_cola" },
            { label: "Vinho", emoji: "🍷", value: "vinho" },

            { label: "Café", emoji: "☕", value: "cafe" },
            { label: "Pão", emoji: "🍞", value: "pao" },
            { label: "Bolo", emoji: "🍰", value: "bolo" }
          )
      );

      interaction
        .reply({ embeds: [embed], components: [menu], ephemeral: true })
        .then(() => {
          let filtro = (msg) => msg.user.id === interaction.user.id;
          let coletor = interaction.channel.createMessageComponentCollector({
            filter: filtro,
          });

          coletor.on("collect", async (c) => {
            const saldo = await db.get(`carteira_${interaction.user.id}`);
            if (saldo === null) saldo = "0";

            const value = c.values[0];

            if (value === "pizza") {
              if (saldo < 200) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`200\` para comprar 1 pizza`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 200);
                db.add(`pizza_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 pizza por \`200\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "batata_frita") {
              if (saldo < 300) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`300\` Az Coins para comprar 1 batata frita`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 300);
                db.add(`batata_frita_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 batata frita por \`300\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "hamburguer") {
              if (saldo < 500) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`500\` Az Coins para comprar 1 hamburguer`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 500);
                db.add(`hamburguer_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 hamburguer por \`500\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "suco") {
              if (saldo < 200) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`200\` Az Coins para comprar 1 suco`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 200);
                db.add(`suco_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 suco por \`200\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "coca_cola") {
              if (saldo < 300) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`300\` Az Coins para comprar 1 coca cola`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 300);
                db.add(`coca_cola_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 coca cola \`300\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "vinho") {
              if (saldo < 500) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`500\` Az Coins para comprar 1 vinho`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 500);
                db.add(`vinho_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 vinho \`500\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "cafe") {
              if (saldo < 200) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`200\` Az Coins para comprar 1 café`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 200);
                db.add(`cafe_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 café por \`200\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "pao") {
              if (saldo < 300) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`300\` Az Coins para comprar 1 pão`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 300);
                db.add(`pao_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 pão por \`300\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            } else if (value === "bolo") {
              if (saldo < 500) {
                c.reply({
                  content: `Olá ${interaction.user}, você não possui a quantia de: \`500\` Az Coins para comprar 1 bolo`,
                  ephemeral: true,
                });
              } else {
                await db.sub(`carteira_${interaction.user.id}`, 500);
                db.add(`bolo_${interaction.user.id}`, 1);
                c.reply({
                  content: `Olá ${interaction.user} você comprou 1 bolo por \`500\` Az Coins!\nVeja seu inventário com \`/inventario\`.`,
                  ephemeral: true,
                });
              }
            }
          });
        });

    }

  },
};
