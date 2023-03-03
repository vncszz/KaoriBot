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
        interaction.reply({content: `**Olá, venho te convidar a se juntar ao  Anime's Zero, somos uma comunidade focado em ANIMES/MANGÁS & ENTRETENIMENTO.

        ╺╸Staff Ativa e sempre pronta pra ajuda-lo(a)
        ╺╸Chats ativo e membros super divertidos
        ╺╸Varios bots de diversao como Mudae,Lord, Akinator, Gartic, poketwo e etc...
        ╺╸Chats para noticias sobre conteúdo nerd e reocomendação de anime/mangá
        ╺╸Parcerias ON a qualquer momento
        ╺╸Eventos e sorteios frequentemente
        ╺╸2x daily e recompensas para boosters**

        告 | Banner: https://imgur.com/i6PmGHw.png
        愛 | Convite: https://discord.gg/animesbrasil`, ephemeral: true})
    }
  }
}