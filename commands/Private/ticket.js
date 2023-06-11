const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket")
        .setDescription("execute para enviar o painel de ticket")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { guild } = interaction;

        const embed = new EmbedBuilder()
            .setColor('#000000')
            .setTitle(`<:home_badge:1113565473171329169> Anime's Zero: Suporte`)
            .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL() })
            .setDescription(`Abra um ticket para obter suporte com nossa equipe!
Escolha a forma que você deseja entrar em contato com nossa staff.

📢 Denúncias:
Vá direto ponto com imagens e id's para realizar a sua denuncia.

❓ Ajuda/Dúvida:
Esta com dúvidas sobre o servidor ou precisa de algo? abra um ticket.

<:partner:1117108229860773958> Parceria:
Está querendo parceria? abra um ticket.`)


        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("denuncia").setLabel("Denúncias").setStyle(ButtonStyle.Danger).setEmoji("📢"),
            new ButtonBuilder().setCustomId("duvida").setLabel("Ajuda/Dúvida").setStyle(ButtonStyle.Secondary).setEmoji("❓"),
            new ButtonBuilder().setCustomId("parceria").setLabel("Parceria").setStyle(ButtonStyle.Primary).setEmoji("<:partner:1117108229860773958>"),
        )

        interaction.reply({ content: "Painel Enviado.", ephemeral: true }).then(() => {
            guild.channels.cache.get("1078425112337981551").send({ embeds: [embed], components: [button] });
        });
    },
};