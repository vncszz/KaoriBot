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
    \`/ping\` \`/avaliar (avalia um staff)\` \`/reportarbug\` \`/userinfo\` \`/infobot\`
    
    🛡️ **Comandos de Moderação:**
    \`/ban\` \`/bateponto\` \`/clear\` \`/deletecanal ( por botão )\` \`/unban\` \`/invite\` \`/parceria\` \`/cleardm ( limpa minhas mensagens da sua DM )\` \`/addmember ( adiciona o membro em um canal) \` \`/parceria\``)
            .setColor('Purple')

        interaction.reply({ embeds: [embed] })
    }
}