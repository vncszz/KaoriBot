const { AttachmentBuilder } = require("discord.js");
const Levels = require("discord-xp");
const canvacord = require('canvacord');
const { } = require('discord.js');


module.exports = {
    name: "rank",
    aliases: ['xp'],

    run: async (client, message, args) => {

        let member = message.mentions.members.last() || message.member;
        const users = await Levels.fetch(member.id, message.guildId);

        if (!member) {
            try {
                member = await message.guild.members.fetch(args[0])
            } catch {
                member = message.member;
            }
        }

        if (!users) return message.reply({ content: "O usuário mencionado não tem XP." })

        const neededXp = Levels.xpFor(parseInt(users.level) + 1);
        
        const rank = new canvacord.Rank()
            .setAvatar(member.displayAvatarURL({ format: 'png', size: 512 }))
            .setCurrentXP(users.xp)
            .setRequiredXP(neededXp)
            .setLevel(users.level)
            .setProgressBar("#603866", "COLOR")
            .setStatus('streaming', true)
            .setUsername(member.user.username)
            .setBackground("IMAGE", 'https://minecraft-tutos.com/wp-content/uploads/2022/03/background-screen-minecraft-water.jpeg')
            .setDiscriminator(member.user.discriminator)

        rank.build()
            .then(data => {
                const attachment = new AttachmentBuilder(data, "RankCard.png");
                message.reply({ files: [attachment] });
            });

    }
}