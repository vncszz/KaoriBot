const { Events } = require('discord.js');
const client = require('../../index');
const Discord = require("discord.js");
const chalk = require("chalk");

client.on("messageCreate", async (message) => {
    const guild = guild.memberCount;
    if(message.mentions.has(client.user.id)) {
        await message.reply('Olá, para ver meus comandos utilize **/ajuda**')
    };

});