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
            .setColor('DarkPurple')
            .setTitle(`<:emoji_25:1077749022841913415> Anime's Zero: Suporte`)
            .setThumbnail(interaction.guild.iconURL())
            .setDescription(`Abra um ticket para obter suporte com nossa equipe!\n\n__Assuntos:__\n<:number1:1076556208128925706> Parcerias.\n<:number2:1076556272222093352> Patrocínios.\n<:number3:1076556331923804161> Claim.\n<:number4:1076556397283651714> Denúncias.\n<:number5:1076556430968107068> Comprar Vip.`)
            .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL() })

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("ticket").setEmoji("<:Chat:1102914157390594049>").setLabel("Abrir Ticket").setStyle(ButtonStyle.Secondary)
        )

        interaction.reply({ content: "Sistema enviado.", ephemeral: true }).then(() => {
            guild.channels.cache.get("1088461067996364862").send({ embeds: [embed], components: [button] });
        });
    },
};