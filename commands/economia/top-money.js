const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const schema = require("../../database/models/currencySchema");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("top-money")
        .setDescription("Veja o top money do servidor"),

    async execute(interaction) {

        const { client } = interaction;

        await interaction.deferReply();

        let dataGlobal = await schema.find({ guildId: interaction.guild.id }).sort([["coins", "descending"]])
        dataGlobal = dataGlobal.slice(0, 10);
        if (!dataGlobal) return interaction.reply({ content: "Não há membros no rank" })

        const positionUser = dataGlobal.findIndex(dataUser => dataUser.userId === interaction.user.id) + 1

        const embed = new EmbedBuilder()
            .setTitle("Rank")
            //.setThumbnail(interaction.guild.iconURL())
            .setDescription(`${dataGlobal.map((data, index) => `${index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}. **<@${data.userId}>** - \`${data.bank.toLocaleString()}\` coins`).join("\n")}`)
            .setColor("Random")
            .setFooter({ text: `Você está em ${positionUser}.`, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp()

        interaction.followUp({ embeds: [embed] })
    }
}
