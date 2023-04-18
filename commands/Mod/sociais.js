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

      <:youtube:1097561919717654670> [Youtube](https://www.youtube.com/channel/UCBjrdI53eV_Eb73uLBYTNwA)
      <:tiktok:1097561955260186674> [Tik Tok](https://www.tiktok.com/@animeszero0?_t=8bZbxEf2dh0&_r=1)
      <:instagram:1097561876524703765> [Instagram](https://www.instagram.com/animes_zeroo/)`)
                //.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                //.setImage(`https://cdn.discordapp.com/attachments/1076242922971869214/1096580300944977980/553_Sem_Titulo_20230414180100.png`)
                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

            interaction.reply({ content: "Embed enviado.", ephemeral: true }).then(() => {
                interaction.channel.send({ embeds: [embed] });
            });
        }



    },
};