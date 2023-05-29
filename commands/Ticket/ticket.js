const { SlashCommandBuilder, ChatInputCommandInteraction, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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
            .setColor('#000000')
            .setTitle(`<:emoji_25:1077749022841913415> Anime's Zero: Suporte`)
            //.setThumbnail(interaction.guild.iconURL())
            .setDescription(`Abra um ticket para obter suporte com nossa equipe!
__Suporte Geral__
> Patrocínios
> Resgatar Prêmio
> Parcerias 
> Denúncias

__Comprar Vip__
> Somente para compra de Vips.`)
            .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL() })

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("ticket").setEmoji("<:Chat:1102914157390594049>").setLabel("Suporte Geral").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("comprar_vip").setEmoji("🛒").setLabel("Comprar Vip").setStyle(ButtonStyle.Success)
        )

        interaction.reply({ content: "Painel Enviado.", ephemeral: true }).then(() => {
            guild.channels.cache.get("1078425112337981551").send({ embeds: [embed], components: [button] });
        });
    },
};