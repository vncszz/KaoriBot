const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "[🖼] • Mostra o seu avatar de seu perfil ou de outro usuário.",
    options: [
        {
            name: 'user',
            type: 6,
            description: 'Mencione o usuário de quem você quer ver o avatar.',
            required: false
        },
    ],
    run: async (client, interaction) => {

        let user = interaction.options.getUser('user') || interaction.user;

       /* let footerText = ' ';
        if (user.id === interaction.user.id) {
            footerText = 'quando for a propria pessoa'
        } else if (user.id === client.user.id) {
            footerText = 'quando ver o av do bot'
        }*/

        const button = new Discord.ButtonBuilder()
            .setEmoji('<:baixar:1079396900496748564>')
            .setLabel("Clique aqui para baixar")
            .setStyle(Discord.ButtonStyle.Link)
            .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

        const row = new Discord.ActionRowBuilder().addComponents(button);

        let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 })

        let embed = new Discord.EmbedBuilder()
            .setTitle(`🖼・${user.username}`)
            .setColor('#000000')
            .setImage(avatar)

        interaction.reply({ embeds: [embed], components: [row] })

    }
}