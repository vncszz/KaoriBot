const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("welcome-setup")
        .setDescription("Seta o canal de boas vindas.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption((channel) => channel
            .setName('canal')
            .setDescription('mencione o canal')
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        ),


    async execute(interaction) {

        const channel = interaction.options.getChannel('canal')

        db.set('welcomechannel', channel.id)

        await interaction.reply({ content: `Sistema Setado.`, ephemeral: true })

    }
}

