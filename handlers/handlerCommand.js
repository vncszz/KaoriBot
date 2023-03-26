const chalk = require('chalk');

function loadCommands(client) {
  const fs = require("fs");

  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./commands");

  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../commands/${folder}/${file}`);

      client.commands.set(commandFile.data.name, commandFile);

      commandsArray.push(commandFile.data.toJSON());
      console.log(chalk.hex(`EE82EE`).bold(`(/) - ${commandFile.data.name} Carregado com sucesso.`));
    }
  }
  client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };