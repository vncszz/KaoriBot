const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {

    console.log(chalk.hex(`56F510`).bold(`[Status] - Online como ${client.user.username}`));

  },
};