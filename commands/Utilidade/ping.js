const { SlashCommandBuilder } = require("discord.js");
const ms = require('ms');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Obtenha meu ping!"),

    async execute(interaction) {

        const { client } = interaction;

        let ping = client.ws.ping;

        interaction.reply({ content: `🏓• **Pong!**\n🛰️ Latência em **${Math.round(ping)} ms**\n📡 Tempo Resposta:  **${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}**`, ephemeral: true });
    }
}