const chalk = require('chalk');

function loadCommands(client) {
  const fs = require("fs");

  let commandsArray = [];

  const commandsFolder = fs.readdirSync("./Commands");

  for (const folder of commandsFolder) {
    const commandFiles = fs
      .readdirSync(`./Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const commandFile = require(`../Commands/${folder}/${file}`);

      client.commands.set(commandFile.data.name, commandFile);

      commandsArray.push(commandFile.data.toJSON());

    }
  }
  console.log(chalk.hex(`32C910`).bold(`(🤝) Commands Carregados.`));
  client.application.commands.set(commandsArray);
}

module.exports = { loadCommands };