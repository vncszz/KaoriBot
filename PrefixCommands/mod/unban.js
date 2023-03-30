const Discord = require('discord.js');
const bot = require('../../bot.json');

module.exports = {
    name: "unban",
    aliases: ['volta', 'desban', 'desbanir'],
    /**
     * 
     * @param {Discord.Message} message
     * 
     */
    run: async (client, message, args) => {


        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.guild.members.cache.get(args[0]);
        const motivo = args[1] || "Não Informado";

        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) { //Permissão do membro.

            const e = new Discord.EmbedBuilder()
                .setDescription(`${bot.emoji.nao} Você não possui permissão de \`desbanir membros\``)
                .setColor(bot.config.cor)

            return message.channel.send({ embeds: [e] })
        }


        const membro = message.guild.bans.cache.get(user)

        const e1 = new Discord.EmbedBuilder()
            .setTitle('Sistema de Punições | Naomi™')
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setDescription('<:user:1090294534652563466> | **Usuário Desbanido:**')
            .addFields(
                { name: `Membro:`, value: `${args[0]}`, inline: true },
                { name: `Motivo:`, value: `**${motivo}**`, inline: false },
            )
            .addFields(
                { name: `Autor:`, value: `${message.author}`, inline: true },
                { name: `ID:`, value: `\`${message.author.id}\``, inline: true }
            )

        message.channel.send({ embeds: [e1] }).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 10000)
        });

        message.guild.members.unban(args[0], { reason: motivo }).catch(e => {

            const e2 = new Discord.EmbedBuilder()
                .setDescription(`${bot.emoji.nao} Não possível realizar o desbanimento de ${user}.`)
                .setColor(bot.config.cor)

            message.channel.send({ content: `Erro ao desbanir usuário` }).then((msg) => {
                setTimeout(() => {
                    msg.delete()
                }, 6000)
            })
            console.log(e)
        })

    }
};