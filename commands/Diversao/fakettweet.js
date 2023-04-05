const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fake-tweet")
        .setDescription("Faça os usuários tweetarem algo.")
        .addStringOption(option => option.setName("tweet").setDescription("oque deseja twettar?").setRequired(true))
        .addUserOption(option => option.setName("user").setDescription("Marque o autor do twett.").setRequired(false)),
    async execute(interaction) {

        const { client } = interaction;

        let tweet = interaction.options.getString("tweet");
        let user = interaction.options.getUser("user") || interaction.user;
        let avatarUrl = user.avatarURL({ extension: "jpg" });
        let canvas = `https://some-random-api.ml/canvas/tweet?avatar=${avatarUrl}&displayname=${encodeURIComponent(user.username)}&username=${encodeURIComponent(user.username)}&comment=${encodeURIComponent(tweet)}`;

        await interaction.channel.sendTyping(), await interaction.channel.send({ content: canvas });
        await interaction.reply({ content: "Enviei a imagem do tweet.", ephemeral: true });
    },
};