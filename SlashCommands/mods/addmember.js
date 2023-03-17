const Discord = require("discord.js")

module.exports = {
    name: "addmember", // Coloque o nome do comando
    description: "[🚫] • Dê permissão para algum membro ver o canal.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options:[
        {
            name: "membro", // nome da opção
            description: "Qual membro deseja ", // descrição
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        }
    ],

    run: async (Client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `<:awp_c_0:1065717278940856390> Você não possui permissão de \`Gerenciar Canais\` para utilizar este comando.`, ephemeral: true })}
        else
        {
            let user = interaction.options.getUser("membro")
                let userid = interaction.guild.members.cache.get(user.id)

            interaction.channel.permissionOverwrites.edit(userid, {ViewChannel: true})
            
                interaction.reply(`${user} adicionado com sucesso em ${interaction.channel}!`)
        }
    }
}