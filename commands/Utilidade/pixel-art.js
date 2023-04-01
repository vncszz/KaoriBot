const discord = require("discord.js");

module.exports = {
    data: new discord.SlashCommandBuilder()
        .setName("pixel-arte")
        .setDescription("Faça uma pixel art do avatar de alguém")
        .addUserOption((option) =>
            option.setName("user").setDescription("Selecione o usuario")
        ),
    /**
     * @param {discord.Client} client
     * @param {discord.CommandInteraction} interaction
     */
    async execute(client, interaction) {
        let user = interaction.options.getUser("user");

        if (!user) {
            user = interaction.user;
        }

        let avatarUrl = user.avatarURL({ size: 512, extension: "jpg" });
        let canvas = `https://some-random-api.ml/canvas/pixelate?avatar=${avatarUrl}`;

        await interaction.reply({
            content: canvas,
        });
    },
};
