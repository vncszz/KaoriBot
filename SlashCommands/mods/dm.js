const Discord = require("discord.js");

module.exports = {
  name: "dm", // Coloque o nome do comando
  description: "[💻] • Envie uma mensagem na Dm do usuário", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,
  options: [

    {
        name: 'usuário',
        description: 'Mencione o usuário no qual receberá a mensagem.',
        type: Discord.ApplicationCommandOptionType.User,
        required: true,
    },
    {
        name: 'mensagem',
        description: 'A mensagem que será enviada.',
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    },
  ],

  run: async (client, interaction) => {
    
    if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
        interaction.reply({content: `Você não possui permissão de \`Administrador\` pra isso`, ephemeral: true})
    } else {
        let msg = interaction.options.getString('mensagem')
        let user = interaction.options.getUser('usuário')

        const embed = new Discord.EmbedBuilder()
        .setTitle('✉️ • Comunicado')
        .setAuthor({name:`${client.user.username}`, URL: client.user.displayAvatarURL({ dynamic: true })})
        .setColor('Purple')
        .setDescription(`${msg}`)
        .setFooter(`Mensagem Enviada a: ${user.username}`)

        interaction.reply({content: `✅ Mensagem enviada com sucesso!`, ephemeral: true})

        user.send({embeds: [embed] }).catch (e => {
            interaction.reply({content: `O Usuário tem a Dm fechada! ☹️`, ephemeral: true})
        })
    }
  }
}