const Discord = require("discord.js")
const { link } = require("fs");

module.exports = {
    name: "infobot",
    description: "[🤖] • Fornece informações sobre o bot.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let bot = client.user.tag;
        
        let botao = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setEmoji('<:familyaz:1076956785539301496>')
            .setURL('https://discord.gg/animesbrasil')
            .setLabel("Meu Card")
            .setStyle(Discord.ButtonStyle.Link)
        );

        let embed = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Pedido por: ${interaction.user.username}` })
            .setDescription(`Olá eu sou a ${bot}\nSou a Bot Oficial do servidor Animes Zero.\nPara ver Minha História, clique em \`Meu Card\``);

            
        interaction.reply({ embeds: [embed], components:[botao] })


    }
}