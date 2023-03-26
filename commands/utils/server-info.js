const Discord = require("discord.js");
const { link } = require("fs");
const { url } = require("inspector");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("server-info")
        .setDescription("[💼] • Envia as informações do atual servidor."),

    async execute(interaction) {

        const { guild } = interaction;
        const nome = interaction.guild.name;
        const id = interaction.guild.id;
        const icon = interaction.guild.iconURL({ dynamic: true });
        const membros = interaction.guild.memberCount;

        const owner = await interaction.guild.fetchOwner();
        const criacao = interaction.guild.createdAt.toLocaleDateString();

        const canais_total = interaction.guild.channels.cache.size;
        const canais_texto = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildText).size;
        const canais_voz = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice).size;
        const canais_categorias = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;


        const embed1 = new Discord.EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: nome, iconURL: icon })
            .setThumbnail(icon)
            .setTimestamp()
            .setImage(guild.bannerURL({ size: 1024 }))
            .addFields(
                {
                    name: `💻 ID:`,
                    value: `${id}`,
                    inline: true
                },
                {
                    name: `📅 Criado em:`,
                    value: `${criacao}`,
                    inline: true
                },
                {
                    name: `👑 Dono:`,
                    value: `${owner}`,
                    inline: true
                },

                {
                    name: `💬 Canais`,
                    value: `(${canais_total})`,
                    inline: true
                },
                {
                    name: `📝 Texto`,
                    value: `(${canais_texto})`,
                    inline: true
                },
                {
                    name: `🗣️ Voz`,
                    value: `(${canais_voz})`,
                    inline: true
                },
                {
                    name: `👥 Membros:`,
                    value: `(${membros})`,
                    inline: true
                },
                { name: "Banner", value: guild.bannerURL() ? "** **" : "Nenhum" }

            );

        interaction.reply({ embeds: [embed1] })
    }
}