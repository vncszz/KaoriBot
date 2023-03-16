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
        interaction.reply({content: `**☕ Anime's Zero
        ・Seja muito bem vindo(a) a nosso servidor
        Somos uma comunidade Geek que buscamos proporcionar Amizades & entretenimento para nossos membros.
        
        Aqui temos:\n🎋・Servidor organizado a todo o público.\n🔨・Vagas staff abertas.\n🚀・Beneficios vip/booster.\n🤝・Parceria sempre abertas.\n💬・Server ativo.\n・Banner: https://i.imgur.com/i6PmGHw.png\n・Convite: https://discord.gg/animesbrasil`, ephemeral: true})
    }
  }
}