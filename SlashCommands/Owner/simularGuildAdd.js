const Discord = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  name: "simularguildmemberadd", // Coloque o nome do comando
  description: "Simula a mensagem de boas vindas", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (interaction) => {
    const member = interaction.member;
    interaction.client.emit('guildMemberAdd', member)
    await interaction.reply({content: `Evento simulado para ${member}!`})
  }
}