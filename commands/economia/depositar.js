const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("depositar")
        .setDescription("Deposite sua grana no banco")
        .addIntegerOption((option) =>
            option
                .setName("quantidade")
                .setDescription("Quanto você deseja depositar?")
                .setRequired(true)
        ),
    /**
     * @param {discord.Client} client
     * @param {discord.CommandInteraction} interaction
     */
    async execute(interaction) {

        const { client } = interaction;

        let depositAmount = interaction.options.getInteger("quantidade");

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

        if (depositAmount > data.wallet) {
            await interaction.reply({
                content: "Você não tem tantas moedas na carteira para depositar.", ephemeral: true
            });
        } else if (depositAmount <= 0) {
            await interaction.reply({
                content: "Só aceitamos depósito acima do valor de 0 moedas.", ephemeral: true
            });
        } else {
            data.wallet -= depositAmount * 1;
            data.bank += depositAmount * 1;
            await data.save();

            const depositEmbed = new discord.EmbedBuilder()
                .setColor("#0155b6")
                .setTitle('Depósito Efetuado')
                .setDescription(
                    `💰 Você depositou **${depositAmount.toLocaleString()} AzCoins** em seu Banco.\nPara consultar o saldo utilize \`/banco\``
                );

            await interaction.reply({
                embeds: [depositEmbed],
            });
        }
    },
};
