const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow } = require('discord.js')

module.exports = {

    name: 'ajuda',
    description: 'Exibe meu painel de ajuda.',
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        let embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
            .setTitle(`Ajuda da ${client.user.username}`)
            .setDescription(`Olá, meu prefixo é \`/\`

                            🎨 **Comandos Gerais:**
                                \`/ping\`\n\`/avaliar (avalia um staff)\`\n\`/reportarbug\`\n\`/userinfo\`\n\`/infobot\`

                            🛡️ **Comandos de Moderação:**
                                \`/ban\`\n\`/bateponto\n\`/clear\`\n\`/deletecanal ( por botão )\`\n\`/unban\`\n\`/invite\`\n\`/parceria\`\n\`/cleardm ( limpa minhas mensagens da sua DM )\`\n\`/addmember ( adiciona o membro em um canal) \`\n\`/parceria\`\n\`ticket ( painel de ticket )\``)
            .setColor('Purple')

        interaction.reply({ embeds: [embed] })



    }
}