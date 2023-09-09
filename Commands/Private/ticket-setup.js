const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, PermissionFlagsBits, ChannelType } = require("discord.js");
const config = require("../../config.json");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-setup")
        .setDescription("Envia o painel de tickets")
        .addChannelOption((option) => option.setName("canal_painel").setDescription("Qual será o canal?").setRequired(false).addChannelTypes(ChannelType.GuildText))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        if (!interaction.member.permissions.has(config.perms.desenvolvedor)) {
            return interaction.reply({ content: `**Esse comando é apenas para meu desenvolvedor!**`, ephemeral: true })
        } else {
            let channel = interaction.options.getChannel("canal_painel") || interaction.channel;

            const painel_embed = new EmbedBuilder()
                .setTitle(`Ticket de suporte: ${interaction.guild.name}`)
                .setDescription(`**Bem-vindo ao chat de Ticket do Anime's Zero! Aqui você poderá saciar as seguintes questões:**

\`1.\` Denúncia e/ou reporte;
\`2.\` Parceria;
\`3.\` Comprar Icone e/ou VIP;
\`4.\` Sugestões;
\`5.\` Patrocinar por sonhos;
\`6.\` Patrocinar por R$;
\`7.\` Ajuda/dúvida;
\`8.\` Claimar Prêmio (sorteio);`)
                .setColor("#F057E4")
                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                .setFooter({ text: `©️ 2023 ${interaction.guild.name} - Todos os direitos reservados.` })


            const painel_escolhas = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("painel_ticket")
                    .setPlaceholder("Escolha uma categoria")
                    .addOptions(
                        {
                            label: `Denúncia e/ou reporte`,
                            emoji: `<:ban_caz:1122465926076436602>`,
                            description: `Denuncie e reporte aqui.`,
                            value: `opc_denuncia`,
                        },
                        {
                            label: `Parceria`,
                            emoji: `<a:1_partner:1147965955046117426>`,
                            description: `Fechar uma parceria? clique aqui.`,
                            value: `opc_parceria`,
                        },
                        {
                            label: `Comprar Icone e/ou VIP`,
                            emoji: `<:Money:1147966266934562866>`,
                            description: `Compre vips aqui.`,
                            value: `opc_comprarVip`,
                        },
                        {
                            label: `Sugestão`,
                            emoji: `💁‍♂️`,
                            description: `Faça suas sugestões aqui.`,
                            value: `opc_sugestoes`,
                        },
                        {
                            label: `Patrocinar por sonhos`,
                            emoji: `🪙`,
                            description: `Patrocine por sonhos aqui.`,
                            value: `opc_patrocinio_sonhos`,
                        },
                        {
                            label: `Patrocinar por R$`,
                            emoji: `💳`,
                            description: `Patrocine por dinheiro aqui.`,
                            value: `opc_patrocinio_dinheiro`,
                        },
                        {
                            label: `Ajuda/dúvida`,
                            emoji: `❓`,
                            description: `Tire suas dúvidas aqui.`,
                            value: `opc_ajuda_duvida`,
                        },
                        {
                            label: `Claimar Prêmio (Sorteio)`,
                            emoji: `🎁`,
                            description: `Resgate um premio ganho em sorteio.`,
                            value: `claimar_premio`,
                        },
                        {
                            label: `Desbugar seleção`,
                            emoji: `<:1129discord:1147966900186394776>`,
                            description: `Apenas Desbugue a seleção do ticket.`,
                            value: `opc_desbugar_selecao`,
                        },
                    )
            )

            await interaction.reply({ content: `Canal setado e enviado!`, ephemeral: true })

            channel.send({ embeds: [painel_embed], components: [painel_escolhas] })
        }
    }
}