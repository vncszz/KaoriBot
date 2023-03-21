const { SlashCommandBuilder } = require("discord.js");
const Afk = require("../../database/models/afkSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("afk")
        .setDescription("definir status para afk")
        .addStringOption((option) => option.setName("reason").setDescription("Motivo para o afk.")),
    async execute(interaction) {
        let reason = interaction.options.getString("reason");

        const currentTime = new Date();
        try {
            const afk = await Afk.findOneAndUpdate(
                { Guild: interaction.guild.id, User: interaction.user.id },
                { IsAfk: true, Reason: reason, LastSeen: currentTime },
                { upsert: true, new: true }
            );
        } catch (err) {
            console.error(err);
        }

        await interaction.reply({
            content: `<@${interaction.member.user.id}> Eu defino seu AFK: ${reason || "AFK"
                }`,
        });
    },
};