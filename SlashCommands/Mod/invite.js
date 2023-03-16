const Discord = require("discord.js")
const { PermissionsBitField: { Flags } } = require('discord.js')


module.exports = {
  name: "invite", // Coloque o nome do comando
  description: "[💼] • Copie o invite do servidor", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (interaction) => {

    if(!interaction.member.permissions.has(Flags.PermissionsBitField.ManageMessages)) {
        interaction.reply({content: `Você não tem permissão para utilizar esse comando.`, ephemeral: true})
    } else {
        interaction.reply({content: `☕️・**Anime's Zero**

        Um servidor geek diferente onde seu entretenimento é nosso foco, abrangemos uma diversidade imensa de pessoas incríveis.
        
        Aqui você encontrará :  
        ・Chances únicas de obter recompensas como Nitro e Vip.
        ・Staff organizada, além de vagas que esperam pra ser preenchida por você.
        ・Uma Bot mascote muito querida e fofa
        ・Eventos feitos por recomendações dos próprios membros.
        ・Aceitamos parcerias, caso você queira associar seu server ao nosso.
        ・Fazemos parte da Black⋅Lotús.

        ・Banner: https://i.imgur.com/i6PmGHw.png
        ・Convite: https://discord.gg/animesbrasil`, ephemeral: true})
    }
  }
}