const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageActionRow } = require('discord.js')

module.exports = {

    name: 'ajuda',
    description: '[👋] • Exibe meu painel de ajuda.',
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction, args) => {

        let embed = new EmbedBuilder()
            .setThumbnail(client.user.displayAvatarURL({ size: 1024 }))
            .setTitle(`Ajuda da ${client.user.username}`)
            .setColor('Purple')
            .setDescription(`Olá, meu prefixo é \`/\`

                            🎨 **Comandos Gerais:**
                                \`/ping\`\n\`/avaliar (avalia um staff)\`\n\`/reportarbug\`\n\`/userinfo\`\n\`/infobot\`\n\`/casar\`\n\`/divorciar\`

                            🛡️ **Comandos de Moderação:**
                                \`/ban\`
                                \`/clear\`
                                \`/unban\`
                                \`/invite\`
                                \`/parceria\`
                                \`/cleardm (limpa minhas mensagens da sua DM)\`   
                                \`/parceria\`
                                
                            💼 **Comandos de Admin:**
                               \`/ticket (painel de ticket)\`)
                               \`/setcategoria (seta categoria de ticket)\`)
                               \`/setcargostaff (seta o cargo de acesso de ticket)\`)
                               \`/setcanal (seta o canal onde o painel de ticket será enviado)\`
                               \`/deletecanal (por botão)\`
                               \`/addmember (adiciona o membro em um canal)\`
                               \`/set-canal-bv (seta o canal de boas vindas)\``)

        interaction.reply({ embeds: [embed] })
    }
}