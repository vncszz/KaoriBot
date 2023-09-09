const chalk = require('chalk');

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {

    console.log(chalk.hex(`F5B60C`).bold(`(🔥) Online como ${client.user.username}\n(👀) Monitorando ${client.users.cache.size} membros`));

    client.user.setPresence({
      status: `Online`,
      activities: [{
        name: `Anime's Zero ❤️`,
        type: `Playing`,
      }]
    });
  },
}