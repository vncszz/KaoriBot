const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Levels = require("discord.js-leveling");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rank")
        .setDescription("Veja o seu rank ou de outro usuário.")
        .addUserOption((option) => option.setName("user").setDescription("Selecione o usuário.")),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { options, guildId, user } = interaction;

        const member = options.getUser("user") || user;

        const levelUser = await Levels.fetch(member.id, guildId);

        const embed = new EmbedBuilder();

        if (levelUser) return interaction.reply({ content: `O usuario que desejas ver o level não tem xp.`, ephemeral: true })

        embed.setDescription(`**${member.tag}** está no level ${levelUser.level} e possui ${levelUser.xp.toLocaleString()} de xp.`)
            .setColor("Random").setTimestamp();

        return interaction.reply({ embeds: [embed] })


    },
};