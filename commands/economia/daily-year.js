const schema = require("../../database/models/currencySchema")
const discord = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("daily-anual")
        .setDescription("Reivindique sua recompensa anual"),
    /**
     * @param {discord.Client} client
     * @param {discord.CommandInteraction} interaction
     */
    async execute(interaction) {

        const { client } = interaction;

        let amount = 1000000;

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

        let timeout = 31557600000;

        if (timeout - (Date.now() - data.yearlyTimeout) > 0) {
            let timeLeft = ms(timeout - (Date.now() - data.yearlyTimeout));

            await interaction.reply({
                content: `Você está em cooldown, por favor, espere por mais **${timeLeft}** para resgatar sua próxima recompensa anual.`, ephemeral: true,
            });
        } else {
            data.yearlyTimeout = Date.now();
            data.wallet += amount * 1;
            await data.save();

            const yearlyEmbed = new discord.EmbedBuilder()
                .setColor("#0155b6")
                .setDescription(
                    `🎁 Você recebeu uma recompensa anual de **${amount.toLocaleString()} AzCoins**`
                );

            await interaction.reply({
                embeds: [yearlyEmbed],
            });
        }
    },
};