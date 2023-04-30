const { ActivityType } = require("discord.js");
const chalk = require('chalk');
const mongoose = require("mongoose")
const mongodbURL = process.env.mongourl

const presences = [
  {
    name: `Anime's Zero #13K`,
    type: ActivityType.Playing,
  },
  {
    name: 'Spy X Family',
    type: ActivityType.Watching,
  },
  {
    name: 'Blue Lock',
    type: ActivityType.Watching,
  },
  {
    name: 'Tokyo Revengers',
    type: ActivityType.Watching,
  },
  {
    name: 'Kimetsu no Yaiba',
    type: ActivityType.Watching,
  },
  {
    name: 'Shingeki no Kyojin',
    type: ActivityType.Watching,
  },
  {
    name: 'Boku no Hero Academia',
    type: ActivityType.Watching,
  },
  {
    name: 'Kimi no Todoke',
    type: ActivityType.Watching,
  },
  {
    name: 'One Piece',
    type: ActivityType.Watching,
  },
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