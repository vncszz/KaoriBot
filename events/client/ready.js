const { ActivityType } = require("discord.js");
//const colors = require("colors");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(("=> ") + ("Client ") + (client.user.username) + (" Carregado com sucesso"));
    let status = [
      `Animes Zero™`,
      `.gg/animesbrasil`,
    ];
    i = 0;
    setTimeout(() =>
      client.user.setActivity(
        `${status[i++ % status.length]}`,
        {
          type: ActivityType.Playing,
        },
        5000
      )
    );
  },
};