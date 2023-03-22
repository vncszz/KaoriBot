module.exports = {
    name: "interactionCreate",

    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(
                `No command matching ${interaction.commandName} was found.`
            );
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            interaction.reply({
                content: "Erro: " + `${error.message}`,
                ephemeral: true,
            });
            console.error(error);
        }
    },
};