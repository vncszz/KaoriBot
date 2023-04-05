const Discord = require('discord.js');
const bot = require('../../bot.json');

module.exports = {
    name: "ping",
    aliases: ['p'],

    run: async (client, message) => {

        const embed = new Discord.EmbedBuilder()
            .setTitle(`🌐 Ping`)
            .setDescription(`Ping Atual: \`${client.ws.ping}\` ms\nAtividade: <t:${parseInt((Date.now() - client.uptime) / 1000)}:R>`)
            .setColor(bot.config.cor)

        message.reply({ embeds: [embed] })

    }
};