const {ChatInputCommandInteraction} = require("discord.js");
const block = "⬛";
const heart = ":red_square:";
const Discord = require('discord.js');


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ship')
        .setDescription('Descubra o quanto duas pessoas se amam.')
        .addUserOption((user) => user.setName('user').setDescription('Selecione o primeiro usuário').setRequired(true))
        .addUserOption((user) => user.setName('user2').setDescription('Selecione o segundo usuário').setRequired(true)),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction) {

        const user1 = interaction.options.getUser("user")
        const user2 = interaction.options.getUser("user2")

        const embed = new Discord.EmbedBuilder()
            .setColor('Red')
            .setTitle('💓 **__Teremos um novo casal aqui?__** 💓')
            .setImage(`https://api.popcat.xyz/ship?user1=${user1.displayAvatarURL({ dynamic: false, extension: "png" })}&user2=${user2.displayAvatarURL({ dynamic: false, extension: "png" })}`)
            .addFields(
                { name: `Membro 1`, value: `****${user1}****`, inline: true },
                { name: `Membro 2`, value: `****${user2}****`, inline: true },
                { name: `**Medidor**`, value: ship() },
            )
        try {
            return interaction.reply({ embeds: [embed] })
        } catch (error) {
            return interaction.Editreply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`❌ | Um erro ocorreu`)
                        .setColor("Red")
                ], ephemeral: true
            })
        }
        function ship() {
            const hearts = Math.floor(Math.random() * 105) + 0;
            const hearte = (hearts / 10)

            const str = `${heart.repeat(hearte)}${block.repeat(11 - hearte)} ${hearts}%`;
            return str;
        }

    }
}