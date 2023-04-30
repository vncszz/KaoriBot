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
            .setTitle(`\🎫 Anime's Zero: Suporte`)
            //.setImage(`https://cdn.discordapp.com/attachments/1076318711029444688/1097985595436978206/SUPORTE_AZ_MITSURI.png`)
            .setDescription(`Abra um ticket para obter suporte com nossa equipe!\n\n__Assuntos:__\n<:number1:1076556208128925706> Parcerias.\n<:number2:1076556272222093352> Patrocínios.\n<:number3:1076556331923804161> Claim.\n<:number4:1076556397283651714> Denúncias.\n<:number5:1076556430968107068> Comprar Vip.`)
            .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL()})

        const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("ticket").setEmoji("<:chat:1093150311977336842>").setLabel("Abrir Ticket").setStyle(ButtonStyle.Secondary)
        )

        interaction.reply({ content: "Sistema enviado.", ephemeral: true }).then(() => {
            guild.channels.cache.get("1078425112337981551").send({ embeds: [embed], components: [button] });
        });
    },
};