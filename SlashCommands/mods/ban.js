const Discord = require("discord.js")

module.exports = {
    name: "ban", // Coloque o nome do comando
    description: "[MODS] • Banir um usuário.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Mencione um usuário para ser banido.",
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description: "Insira um motivo.",
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply(`Você não possui poermissão para utilizar este comando.`);
        } else {
            let banlogs = "1076320030972715128"; // Coloque o ID do canal de texto onde ficará as logs.
            if (!banlogs) return;
            let userr = interaction.options.getUser("user");
            let user = interaction.guild.members.cache.get(userr.id)
            let motivo = interaction.options.getString("motivo");
            if (!motivo) motivo = "Não definido.";

            let embed = new Discord.EmbedBuilder()
                .setTitle(`Ban`)
                .setColor("#000000")
                .setThumbnail(user.displayAvatarURL({size: 1024, dynamic: true}))
                .setDescription(`<:infoblack:1080534203667587143> Usuário: ${user}\n<:id:1083417697355829319> ID: (\`${user.id}\`)\n<:shieldblack:1080531880157384836> Staff: ${interaction.user.username}\n<:envelopblack:1080532568467832942> Motivo: \`${motivo}\``)
                .setFooter({text: `${client.user.username} - Moderação™`})
            let erro = new Discord.EmbedBuilder()
                .setColor("000000")
                .setDescription(`Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);

            user.ban({ reason: [motivo] }).then(() => {
                interaction.guild.channels.cache.get(banlogs).send({ embeds: [embed] })
                interaction.reply({content: `O usuário ${user} foi banido com sucesso.`, ephemeral: true})
                interaction.reply({ embeds: [erro] })
            })
        }

    }
}