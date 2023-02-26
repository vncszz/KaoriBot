const Discord = require("discord.js")

module.exports = {
    name: "infobot",
    description: "Fornece informações sobre o bot.",
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
            .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n>  Nome: \`${bot}\`\n> ** Owner:** <@523665234351751168>
\n>  Membros: \`${membros}\`\n>  Servidores: \`${servidores}\`\n>  Canais: \`${canais}\``);

        interaction.reply({ embeds: [embed] })


    }
}