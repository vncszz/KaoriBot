const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const bot = require("../../bot.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sociais")
        .setDescription("exiba as midias sociais."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { client } = interaction;

        if (!interaction.member.permissions.has(bot.config.ownerId)) {
            interaction.reply({ content: `Você não tem permissão pra isto!`, ephemeral: true });
        } else {
            const embed = new EmbedBuilder()
                .setColor("DarkPurple")
                .setTitle("Redes Sociais")
                .setDescription(`**Siga-nos nas redes sociais abaixo.**

      <:youtube:1097561919717654670> [Youtube](https://www.youtube.com/@AnimesZeroOFC)
      <:tiktok:1097561955260186674> [Tik Tok](https://www.tiktok.com/@animes_zero_ofc?_t=8bfMsk1SrLi&_r=1)
      <:instagram:1097561876524703765> [Instagram](https://www.instagram.com/animes_zeroo/)
      <:pinterest:1098612994839158797> [Pinterest](https://www.pinterest.jp/AnimesZeroOfc/)`)
                //.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                //.setImage(`https://cdn.discordapp.com/attachments/1076242922971869214/1096580300944977980/553_Sem_Titulo_20230414180100.png`)
                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

            interaction.reply({ content: "Embed enviado.", ephemeral: true }).then(() => {
                interaction.channel.send({ embeds: [embed] });
            });
        }



    },
};