//const { PermissionFlagsBits } = require("discord.js")
const Discord = require("discord.js")
const bot = require("../../bot.json")

module.exports = {
    name: "say", // Coloque o nome do comando
    description: "diga uma mensagem através do comando say", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "mensagem",
            description: "Mensagem que será enviada",
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    run: async (client, interaction, args) => {

        //const ownerId = '1086798530783498350'  // Permissão pra um só cargo

        if (!interaction.member.roles.cache.get(bot.config.naomiAcess)) {
            interaction.reply({ content: `você não tem permissão pra isso. 🙁`, ephemeral: true })}
        else {

            let mensagem = interaction.options.getString("mensagem")
            let canal = interaction.channel

            interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true }).then(() => {
                
                canal.send({content: `${mensagem}`})

            })
        }

    }
}