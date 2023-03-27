const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const bot = require("../../bot.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("execute para enviar o sistema de ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setThumbnail(`${interaction.guild.iconURL()}`)
            .setTitle('\🎟️ Suporte via Ticket')
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1076243157714472990/197_Sem_Titulo_20221201192529.png')
            .setDescription("Deseja suporte com nossa equipe?\nClique no botão abaixo pra entrar em contato.")
            .setFooter({ text: '©Animes Zero™ - Todos os Direitos Reservados' })

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("ticket").setEmoji("<:distintivoblack:1083534596949426276>").setLabel("Abrir Ticket").setStyle(ButtonStyle.Secondary)
        )

        interaction.reply({ content: "Sistema criado", ephemeral: true }).then(() => {
            guild.channels.cache.get("1078425112337981551").send({ embeds: [embed], components: [button] });
        });
    },
};