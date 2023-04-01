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
        let saldo = await db.get(`carteira_${user.id}`);
        if (saldo === null) saldo = "0";
        const user = options.getUser("usuário") || interaction.user;

        if (user === 'user') {

            const embed = new EmbedBuilder()
                .setColor("White")
                .setDescription(`Olá ${interaction.user}, aqui está o saldo de ${user.username} carteira abaixo.`)
                .addFields(
                    { name: '🏦 Saldo Atual:', value: `🪙 \`${saldo}\` Az Coins`, },
                )

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
        else {
            const embed = new EmbedBuilder()
                .setColor("White")
                .setDescription(`Olá ${interaction.user}, veja sua carteira abaixo.`)
                .addFields(
                    { name: '🏦 Saldo Atual:', value: `🪙 \`${saldo}\` Az Coins`, },
                )

            interaction.reply({ embeds: [embed], ephemeral: true });
        }

    },
};