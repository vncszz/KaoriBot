const { Configuration, OpenAIApi } = require("openai");
const { Events } = require("discord.js");
const configAi = new Configuration({
    apiKey: process.env.OPENAI_KEY
})
const openai = new OpenAIApi(configAi)
const client = require("../../index")
require('dotenv').config();

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.channel.id !== "1104495658393678045") return;

        let conversationLog = [{ role: 'system', content: `Você é um bot programado pra conversar sobre animes, caso alguém queira saber quem criou você responde que você foi criado por <@523665234351751168>., caso o usuário não quiser conversar sobre animes pergunte como está sendo o dia dele e puxe um assunto aleatório.` }]

        try {
            await message.channel.sendTyping();
            let prevMessages = await message.channel.messages.fetch({ limit: 15 });
            prevMessages.reverse();

            prevMessages.forEach((msg) => {
                if (msg.author.id !== client.user.id && message.author.bot) return;
                if (msg.author.id !== message.author.id) return;

                conversationLog.push({
                    role: 'user',
                    content: msg.content,
                });

            })

            const response = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: conversationLog
            })
                .catch((error) => {
                    console.log(`Erro: ${error}`)
                });

            message.reply(response.data.choices[0].message);
        } catch (error) {
            console.log(`${error}`)
        }
    }
}