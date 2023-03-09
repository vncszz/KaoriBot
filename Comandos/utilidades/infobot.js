const Discord = require("discord.js")

module.exports = {
    name: "infobot",
    description: "[🤖] • Fornece informações sobre o bot.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let membros = client.users.cache.size;
        let canais = client.channels.cache.size;
        let bot = client.user.tag;
        let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
        
        const embed = new Discord.EmbedBuilder()
            .setColor('Purple')
            .setThumbnail(avatar_bot)
            .setFooter({ text: `Pedido por: ${interaction.user.username}` })
            .setDescription({content: `Olá Sou a ${bot},\nBot Oficial do servidor Animes Zero.\nAtualmente estou supervisionando ${membros} membros.\nTenho acesso a ${canais} canais.`})

        interaction.reply({ embeds: [embed]})


    }
}