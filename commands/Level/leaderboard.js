const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("top-membros")
        .setDescription("Veja o seu rank dos top membros mais ativos."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { guildId } = interaction;

        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10);

        if (rawLeaderboard.length < 1) return interaction.reply("Ninguém está na tabela de classificação ainda.")

        const embed = new EmbedBuilder();

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);

        const lb = leaderboard.map(e => `**${e.position}**. ${e.username} ${e.discriminator}\nLevel: ${e.level}\nXp: ${e.xp.toLocaleString()}`)

        embed.setTitle("🏆 - Ranking dos mais ativos").setDescription(lb.join("\n\n")).setTimestamp();

        return interaction.reply({ embeds: [embed] })
    },
};