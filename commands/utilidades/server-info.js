const Discord = require("discord.js");
const { link } = require("fs");
const { url } = require("inspector");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("server-info") // Coloque o nome do comando
        .setDescription("[💼] • Envia as informações do atual servidor."), // Coloque a descrição do comando
    async execute(interaction) {

        const nome = interaction.guild.name;
        const id = interaction.guild.id;
        const icon = interaction.guild.iconURL({ dynamic: true });
        const membros = interaction.guild.memberCount;

        const criacao = interaction.guild.createdAt.toLocaleDateString();

        const canais_total = interaction.guild.channels.cache.size;
        const canais_texto = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildText).size;
        const canais_voz = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildVoice).size;
        //const canais_categoria = interaction.guild.channels.cache.filter(c => c.type === Discord.ChannelType.GuildCategory).size;


        const embed1 = new Discord.EmbedBuilder()
            .setColor('White')
            .setAuthor({ name: nome, iconURL: icon })
            .setThumbnail(icon)
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
                /*{
                    name: `📅 Categorias:`,
                    value: `\`${canais_categoria}\``,
                    inline: false
                }*/

            );

        const botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
                .setURL(icon)
                //.setEmoji('📥')
                .setLabel("Baixar Icon")
                .setStyle(Discord.ButtonStyle.Link)
        )

        interaction.reply({ embeds: [embed1], components: [botao] })
    }
}