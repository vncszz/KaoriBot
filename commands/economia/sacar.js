const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("sacar")
        .setDescription("Saque suas AzCoins do seu Banco")
        .addIntegerOption((option) =>
            option
                .setName("quantidade")
                .setDescription("Quanto você deseja sacar?")
                .setRequired(true)
        ),
    /**
     * @param {discord.Client} client
     * @param {discord.CommandInteraction} interaction
     */
    async execute(interaction) {

        const { client } = interaction;

        let withdrawAmount = interaction.options.getInteger("quantidade");

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
                content: "Ocorreu um erro ao executar este comando...",
                ephemeral: true,
            });
        }

        if (withdrawAmount > data.bank) {
            await interaction.reply({
                content: "Você não tem tantas moedas em seu banco para sacar.",
            });
        } else if (withdrawAmount <= 0) {
            await interaction.reply({
                content: "Por favor insira um número acima de 0.",
            });
        } else {
            data.bank -= withdrawAmount * 1;
            data.wallet += withdrawAmount * 1;
            await data.save();

            const withdrawEmbed = new discord.EmbedBuilder()
                .setColor("#0155b6")
                .setTitle('Saque Efetuado')
                .setDescription(
                    `💰 Você sacou **${withdrawAmount.toLocaleString()} AzCoins** do seu Banco.`
                );

            await interaction.reply({
                embeds: [withdrawEmbed],
            });
        }
    },
};
