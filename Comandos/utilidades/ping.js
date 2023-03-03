const Discord = require("discord.js")

module.exports = {
  name: "ping", // Coloque o nome do comando
  description: "[📡] • Veja o ping do bot.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let ping = client.ws.ping;

    let embed_1 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`<:clockblack:1081169107182960650> ${interaction.user}, meu ping está em \`calculando...\`.`)
    .setColor("#000000");

    let embed_2 = new Discord.EmbedBuilder()
    .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
    .setDescription(`<:verification:1081167759481769994> meu ping está em \`${ping}\` ms`)
    .setColor("#000000")
    .setFooter({text: `Executado por: ${interaction.user.username}`})

    interaction.reply({ embeds: [embed_1] }).then( () => {
        setTimeout( () => {
            interaction.editReply({ embeds: [embed_2] })
        }, 2000)
    })
  }
}