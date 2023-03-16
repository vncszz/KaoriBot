const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")

module.exports = {
  name: "invite", // Coloque o nome do comando
  description: "[📭] • Copie o invite do servidor", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
        interaction.reply({content: `Você não tem permissão para utilizar esse comando.`, ephemeral: true})
    } else {
        interaction.reply({content: `** ・☕ __Anime's Zero__\n・Seja muito bem vindo(a) ao nosso servidor\n・Somos uma comunidade Geek que buscamos proporcionar Amizades & entretenimento para nossos membros.
        
        Aqui temos:\n🎋・Servidor organizado a todo o público.\n🔨・Vagas staff abertas.\n🚀・Beneficios vip/booster.\n🤝・Parceria sempre abertas.\n💬・Chats ativos.**\n🖼️・Banner: https://imgur.com/sLi3dbS.png\n💐・Convite: https://discord.gg/animesbrasil`, ephemeral: true})
    }
  }
}