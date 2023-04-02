const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("banco")
        .setDescription("Mostra seu saldo ou de um usuário")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("Selecione um usuário")
        ),
    /**
     * @param {discord.Client} client
     * @param {discord.CommandInteraction} interaction
     */
    async execute(interaction) {

        const { client } = interaction;
        let user = interaction.options.getUser("user");

        if (!user) {
            user = interaction.user;
        }

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
            await interaction.reply({
                content: "Ocorreu um erro ao executar este comando...",
                ephemeral: true,
            });
        }

        const balanceEmbed = new discord.EmbedBuilder()
            .setColor("#0155b6")
            .setThumbnail(user.displayAvatarURL())
            .setTitle(`__Conta Bancária__ de ${user.username}`)
            .setDescription(
                `💳 Carteira: **${data.wallet.toLocaleString()} AzCoins**\n🏦 Banco: **${data.bank.toLocaleString()} AzCoins**`
            )
            .setTimestamp();

        await interaction.reply({
            embeds: [balanceEmbed],
        });
    },
};