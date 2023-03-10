const Discord = require("discord.js")
require('dotenv').config();


const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildBans,
  ]
});

console.clear()

module.exports = client;

client.slashCommands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('./handler')(client);

const connectiondb = require("./database/connect")
connectiondb.start();

client.login(process.env.token)

//ANTICRASH
process.on('unhandRejection', (reason, promise) => {
  console.log(`❗ | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`❗ | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`❗ | [Erro]\n\n` + error, origin);
});

///////////////////----------------------------MENTION REPLY----------------------//////////////////

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]

  mencoes.forEach(element => {
      if (message.content === element) {

          //(message.content.includes(element)) // caso queira que responda com menção em alguma mensagem

          let embed = new Discord.EmbedBuilder()
              .setColor("#000000")
              .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
              .setDescription(`🤖 Olá ${message.author}, utilize \`/ajuda\` para ver meus comandos!`)

          message.reply({ embeds: [embed] })
      }
  })

})