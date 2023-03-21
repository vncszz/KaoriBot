const bot = require("../../bot.json");
const Discord = require('discord.js');


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("say")
        .setDescription("Diga algo com o comando say.")
        .addStringOption((string) => string.setName('mensagem').setDescription('Mensagem que será enviada').setRequired(true)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {
        
        //const ownerId = '1086798530783498350'  // Permissão pra um só cargo

        if (!interaction.member.roles.cache.get(bot.config.naomiAcess)) {
            interaction.reply({ content: `você não tem permissão pra isso. 🙁`, ephemeral: true })
        }
        else {

            let mensagem = interaction.options.getString("mensagem")
            let canal = interaction.channel

            interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true }).then(() => {

                canal.send({ content: `${mensagem}` })
            })
        }

    }
}