const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Limpe as mensagens do chat.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addNumberOption((numero) => numero.setName('numero').setDescription('a quantidade de mensagens que será apagada.').setMinValue(1).setMaxValue(99).setRequired(true)),

    async execute(interaction) {

        let numero = interaction.options.getNumber('numero')

        if (parseInt(numero) > 100 || parseInt(numero) <= 0) {

            let embed = new Discord.EmbedBuilder()
                .setColor("#9e1111")
                .setDescription(`\`/clear [1 - 99]\``);

            interaction.reply({ embeds: [embed] })

        } else {

            interaction.channel.bulkDelete(parseInt(numero))

            let embed = new Discord.EmbedBuilder()
                .setColor("#f0ea06")
                .setAuthor({ name: `Limpeza concluida com sucesso`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
                .setImage("https://cdn.discordapp.com/attachments/935398454388224000/1030504754838782013/standard_4.gif")
                .setDescription(`O chat ${interaction.channel} teve **${numero}** mensagens apagadas por **${interaction.user.username}**.`);

            interaction.reply({ embeds: [embed] })

            setTimeout(() => {
                interaction.deleteReply()
            }, 5000)

        }

    }

}