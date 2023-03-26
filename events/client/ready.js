const { ActivityType } = require("discord.js");
const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(chalk.hex(`32CD32`).bold(`🔥 Estou online como ${client.user.username}`));
    let status = [
      `Animes Zero™`,
      //`🔧 Manuntenção`
    ];
    i = 0;
    setTimeout(() =>
      client.user.setActivity(
        `${status[i++ % status.length]}`,
        {
          type: ActivityType.Watching,
        },
        5000
      )
    );
  },
};