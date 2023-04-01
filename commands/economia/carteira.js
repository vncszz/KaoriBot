const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("carteira")
        .setDescription("Veja sua carteira!")
        .addUserOption((user) => user.setName("usuário").setDescription("escolhar o usuário(a)").setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { options } = interaction;

        const user = options.getUser("usuário") || interaction.user;

        let saldo = await db.get(`carteira_${user.id}`);
        if (saldo === null) saldo = "0";

        const embed = new EmbedBuilder()
            .setColor("White")
            .setDescription(`Olá ${interaction.user}, Aqui está o saldo consultado.`)
            .addFields(
                { name: '🏦 Saldo Atual:', value: `🪙 \`${saldo}\` Az Coins`, },
            )

        interaction.reply({ embeds: [embed], ephemeral: true });

    },
};