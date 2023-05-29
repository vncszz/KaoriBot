const { SlashCommandBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-channel")
        .setDescription("Limpe todas as mensagens de um canal.")
        .setDMPermission(false),

    async execute(interaction) {
        // check if user has permission to use the command
        if (
            !interaction.member.permissions.has(PermissionsBitField.Administrator)
        ) {
            return interaction.reply({
                content: "Você não tem permissão pra usar este comando!",
                ephemeral: true, // only visible to the user who executed the command
            });
        }

        // defer the reply to reduce API overhead
        await interaction.deferReply({ ephemeral: true });

        // get the channel and initialize a counter for deleted messages
        const channel = interaction.channel;
        let deletedSize = 0;

        // loop through messages and delete them in batches of 100
        while (true) {
            const fetchedMessages = await channel.messages.fetch({ limit: 100 });
            if (fetchedMessages.size === 0) break;

            const deletedMessages = await channel.bulkDelete(fetchedMessages, true);
            if (deletedMessages.size === 0) break;

            deletedSize += deletedMessages.size;
        }

        return interaction.followUp({
            content: `Mensagens Deletadas **${deletedSize}**.`,
        });
    },
}