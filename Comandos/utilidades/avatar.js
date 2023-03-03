const Discord = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Mostra o seu avatar de seu perfil ou de outro usuário.",
    options: [
        {
            name: 'user',
            type: 6,
            description: 'Mencione o usuário de quem você quer ver o avatar.',
            required: false
        },  
    ],
    run: async (interaction) => {

      let user = interaction.options.getUser('user') || interaction.user;

      /*let footerText = ' ';
      if (user.id === interaction.user.id) {
        footerText = 'quando for a propria pessoa'
      } else if (user.id === client.user.id) {
        footerText = 'quando ver o av do bot'
      }*/
      
      const button = new Discord.ButtonBuilder()
      .setLabel("Abrir avatar no navegador")
      .setStyle(Discord.ButtonStyle.Link)
      .setURL(user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 }));

      const row = new Discord.ActionRowBuilder().addComponents(button);
 
      let avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 2048 })

      let embed = new Discord.MessageEmbed()
      .setTitle(`<:avatarimage:1081188625313697922>・${user.username}`)
      .setColor('#ef53ff')
      .setImage(avatar)

      await interaction.reply({ embeds: [embed], components: [row] })
      
    }
}