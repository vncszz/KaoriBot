const Discord = require('discord.js');
const bot = require('../../bot.json');

module.exports = {
    name: "ban",
    aliases: ['b', 'vaza', 'rala'],
    /**
     * 
     * @param {Discord.Message} message
     * 
     */
    run: async (client, message, args) => {

        message.delete();

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.guild.members.cache.get(args[0]);
        const motivo = args[1] || "Não Informado";

        if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.BanMembers)) { //Permissão do membro.

            const e = new Discord.EmbedBuilder()
                .setDescription(`${bot.emoji.nao} Você não possui permissão de \`banir membros\``)
                .setColor(bot.config.cor)

            return message.channel.send({ embeds: [e] })
        }

        if (!user) {
            message.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setDescription(`\`.ban [usuário] [motivo]\``)
                        .setColor(bot.config.cor)
                ]
            });
        }

        const membro = message.guild.members.cache.get(args[0]);

        if (args[0] === message.author.id) {

            const e = new Discord.EmbedBuilder()
                .setDescription(`${bot.emoji.nao} Você não pode se banir.`)
                .setColor(bot.config.cor)

            return message.channel.send({ embeds: [e] })

        }

        if (args[0] === client.user.id) {

            const e = new Discord.EmbedBuilder()
                .setDescription(`${bot.emoji.nao} Você não pode me banir.`)
                .setColor(bot.config.cor)

            return message.channel.send({ embeds: [e] })

        }

        const e1 = new Discord.EmbedBuilder()
            .setTitle('Sistema de Punições | Naomi™')
            .setColor(bot.config.cor)
            .setThumbnail(message.author.avatarURL({ dynamic: true }))
            .setDescription('<:user:1090294534652563466> | **Usuário Banido:**')
            .addFields(
                { name: `Membro:`, value: `${user.tag}`, inline: true },
                { name: `ID:`, value: `\`${args[0]}\``, inline: true },
                { name: `Motivo:`, value: `**${motivo}**`, inline: false },
            )
            .addFields(
                { name: `Autor:`, value: `${message.author}`, inline: true },
                { name: `ID:`, value: `\`${message.author.id}\``, inline: true }
            )

        try {
            message.channel.send({ embeds: [e1] });
        } catch { }

        try {
            message.guild.members.ban(args[0], { reason: motivo })
        } catch { }

    }
};