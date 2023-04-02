const { ActivityType } = require("discord.js");
const chalk = require('chalk');
const Levels = require("discord.js-leveling");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {

    Levels.setURL(config.mongodb);

    console.log(chalk.hex(`56F510`).bold(`[Status] - Online como ${client.user.username}`));
    let status = [
      `Anime's Zero™ #13K`,
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