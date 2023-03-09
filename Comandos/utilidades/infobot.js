const Discord = require("discord.js")
const { link } = require("fs");

module.exports = {
    name: "infobot",
    description: "[🤖] • Fornece informações sobre o bot.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        let membros = client.users.cache.size;
        let servidores = client.guilds.cache.size;
        let canais = client.channels.cache.size;
        let bot = client.user.tag;
        let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
        let embed = new Discord.EmbedBuilder()
            .setColor("#000000")
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setAuthor({ name: bot, iconURL: avatar_bot })
            .setFooter({ text: `Pedido por: ${interaction.user.username}` })
            .setDescription(`Olá eu sou a ${bot}\nSou a Bot Oficial do servidor Animes Zero. \nPara ver Minha História, clique em \`Meu Card\``);

            let botao = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                .setEmoji('🤖')
                .setURL('https://discord.gg/animesbrasil')
                .setLabel("Meu Card")
                .setStyle(Discord.ButtonStyle.Link)
            )
        interaction.reply({ embeds: [embed], components:[botao] })


    }
}