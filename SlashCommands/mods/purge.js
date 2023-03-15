const { PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
const Discord = require("discord.js")
const { SlashCommandBuilder } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Delete as mensagens do canal')
  .addIntegerOption(option => option.setName('quantidade').setDescription(`Insira a quantidade de mensagem que será deletada.`).setMinValue(1).setMaxValue(100).setRequired(true)),

    async execute (interaction) {

        if (interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({content: 'Você não tem permissão de \`Administrador\` pra isso!', ephemeral: true})

        let number = interaction.options.getInteger('quantidade');

        const embed = new EmbedBuilder()
        .setColor('White')
        .setDescription(`\✅ ${number} Mensagens Deletadas`)

        await interaction.channel.bulkDelete(number)

        const button = new Discord.ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('purge')
            .setEmoji('🚮')
            .setStyle(ButtonStyle.Primary)
        )

        const message = await interaction.reply({embeds: [embed], components: [button]});

        const collector = message.createMessageComponentCollector();

        collector.on("collect", async i => {
            if (i.customId === 'purge') {

                if (!i.member.permissions.has(PermissionFlagsBits.Administrator)) return;
                 
                interaction.deleteReply();
            }
        })
    }

}