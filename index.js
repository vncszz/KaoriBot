const Discord = require("discord.js")
require('dotenv').config();


const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildInvites
  ]
});

console.clear()


const { loadEvents } = require("./handler/handlerEvents");
const { loadCommands } = require("./handler/handlerCommands");

client.commands = new Discord.Collection();


//database connect
const connectiondb = require("./database/connect")
connectiondb.start();

/*
//ANTICRASH
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});*/

client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});