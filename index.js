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
client.events = new Discord.Collection();


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


client.on('interactionCreate', async interaction => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'partner') {

    const invite = interaction.fields.getTextInputValue('invitePartner')
    const idPartner = interaction.fields.getTextInputValue('idPartner')

    let canal = interaction.guild.channels.cache.get('1076316523540533309') // id do canal
    //let notificationId = '988493127331508224' //id do cargo de notificação

    await interaction.reply({
      content: `Parceria Enviada com sucesso. <:awp_c_1:1065717312071684096>`, ephemeral: false
    })

    canal.send({ content: `${invite}\nRep: <@${idPartner}>\nPromotor: \`${interaction.user.username}\`` });
  }
})