const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pay")
        .setDescription("Enviar um dinheiro para alguem!")
        .addNumberOption((number) => number.setName("quantidade").setDescription("digite a quantidade que será enviada ao usuário(a)").setMinValue(1).setRequired(true))
        .addUserOption((user) => user.setName("user").setDescription("escolhar o usuário(a)").setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { options } = interaction;

        const user = options.getUser("user");
        const quantidade = options.getNumber("quantidade");

        const saldo = await db.get(`carteira_${interaction.user.id}`);
        if (saldo === null) saldo = "0";

        if (quantidade > saldo) {
            const embed = new EmbedBuilder()
                .setColor("White")
                .setDescription(`Olá ${interaction.user}, você não possui a quantia de 🪙 \`${quantidade}\` Az Coins na sua carteira.\nUtilize o comando \`/carteira\` para verificar o seu saldo.`)

            interaction.reply({ embeds: [embed], ephemeral: true });
        } else {

            await db.add(`carteira_${user.id}`, quantidade)
            await db.sub(`carteira_${interaction.user.id}`, quantidade)

            const embed = new EmbedBuilder()
                .setColor("White")
                .setDescription(`Olá ${interaction.user}, você pagou a quantia de 🪙 \`${quantidade}\` Az Coins para ${user} com sucesso!\nVeja seu saldo utilizando \`/carteira\`.`)

            interaction.reply({ embeds: [embed], ephemeral: false });
        };
    },
};