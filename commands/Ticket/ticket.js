const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("Execute para enviar o sistema de ticket.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { guild } = interaction;

        const canal = guild.channels.cache.get("1078425112337981551");

        if (!canal) {

            await interaction.reply({ content: "Canal de ticket não definido ainda.", ephemeral: true })

        } else {

            const embed = new EmbedBuilder()
                .setColor('White')
                .setThumbnail(`${interaction.guild.iconURL()}`)
                .setTitle('\🎟️ Suporte via Ticket')
                .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1076243157714472990/197_Sem_Titulo_20221201192529.png')
                .setDescription("Deseja suporte com nossa equipe?\nClique no botão abaixo pra entrar em contato.")
                .setFooter({ text: '©Animes Zero™ - Todos os Direitos Reservados' })

            const button = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("abrir_ticket").setEmoji("<:distintivoblack:1083534596949426276>").setLabel("Abrir Ticket").setStyle(ButtonStyle.Secondary)
            );

            await interaction.reply({ content: "Sistema enviado", ephemeral: true }).then(() => {
                canal.send({ embeds: [embed], components: [button] });
            });
        };
    },
};