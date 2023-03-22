const {Partials} = require("discord.js");
const Discord = require("discord.js")
require('dotenv').config();


const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildInvites
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User
  ]
});

console.clear()


const { loadEvents } = require("./handlers/handlerEvent");
const { loadCommands } = require("./handlers/handlerCommand");
const { loadModals } = require('./events/functions/modalCreate');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.modals = new Discord.Collection();
loadModals(client);


//database connect
const connectiondb = require("./database/connect")
connectiondb.start();


//ANTICRASH
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});

client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});