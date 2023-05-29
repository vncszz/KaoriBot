const { QuickDB } = require("quick.db");
const db = new QuickDB();
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ver-parcerias")
        .setDescription("Ver quantas parcerias você tem")
        .addUserOption((option) => option.setName("user").setDescription("Qual usuario deseja ver?").setRequired(true)),

    async execute(interaction) {

        const user = interaction.options.getUser("user");

        let parcerias_total = await db.get(`Parcerias_${user.id}`) || "0";

        const embed = new EmbedBuilder()
            .setColor("Random")
            .setDescription(`${user} tem \`${parcerias_total}\` parcerias.`)
            .setThumbnail(user.displayAvatarURL())

        await interaction.reply({ embeds: [embed], ephemeral: true })
    },
};