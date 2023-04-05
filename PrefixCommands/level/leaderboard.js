const { EmbedBuilder } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    name: "leaderboard",
    aliases: ['top', 'lb'],

    run: async (client, message, args) => {

        const LeaderBoard = await Levels.fetchLeaderboard(message.guild.id, 10); // obtiene los 10 mejores miembros de un gremio y los coloca en la tabla de clasificación

        if (LeaderBoard.length < 1) return interaction.reply("Não há ninguem no rank.");

        const leaderboard = await Levels.computeLeaderboard(client, LeaderBoard, true);
        const lb = leaderboard.map((e => `${e.position === 1 ? "🥇" : e.position === 2 ? "🥈" : e.position === 3 ? "🥉" : e.position + 0}**.${e.username}#${e.discriminator}**\nLevel: ${e.level}\nXp: ${e.xp.toLocaleString()}`));

        const response = new EmbedBuilder()
            .setTitle("🏆 | Leaderboard Mensagens")
            .setDescription(`${lb.join("\n\n")}`)
            .setColor("Yellow")
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTimestamp(new Date)

        message.reply({ embeds: [response] })
    }
} 