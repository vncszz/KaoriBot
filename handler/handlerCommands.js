const fs = require("fs");
const bot = require('../bot.json');
const chalk = require('chalk');

function loadCommands(client) {
    const fs = require("fs");
    // const colors = require("colors"); 
  
    let commandsArray = [];
  
    const commandsFolder = fs.readdirSync("./SlashCommands");
  
    for (const folder of commandsFolder) {
      const commandFiles = fs
        .readdirSync(`./SlashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
  
      for (const file of commandFiles) {
        const commandFile = require(`../SlashCommands/${folder}/${file}`);
  
        client.commands.set(commandFile.data.name, commandFile);
  
        commandsArray.push(commandFile.data.toJSON());
        console.log(("=> ") + ("Comando ") + (commandFile.data.name) + (" Carregado com sucesso"));
      }
    }
    client.application.commands.set(commandsArray);
  }
  
  module.exports = { loadCommands };