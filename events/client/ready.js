const { ActivityType } = require("discord.js");
const chalk = require('chalk');
const mongoose = require("mongoose")
const mongodbURL = process.env.mongourl

const presences = [
  {
    name: `Anime's Zero™`,
    type: ActivityType.Watching,
  },
  {
    name: `/ajuda`,
    type: ActivityType.Playing
  }
];

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {

    console.log(chalk.hex(`56F510`).bold(`[Status] - Online como ${client.user.username}`));

    async function setPresence() {
      const presence = presences[Math.floor(Math.random() * presences.length)];

      client.user.setPresence({
        status: "dnd",
        activities: [
          {
            name: presence.name,
            type: presence.type,
          },
        ],
      });
    }
    setPresence();
    setInterval(async function () {
      await setPresence();
    }, 600000);

    if (!mongodbURL) return

    mongoose.set("strictQuery", false);
    mongoose.connect(mongodbURL, {

      useNewUrlParser: true,
      useUnifiedTopology: true

    }).then(() => {

      console.log(chalk.hex(`56F510`).bold('[MongoDB 🍃] -  Database Conectada.'))

    }).catch(err => console.log(err))


    
  },
}