const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {

        const channelMsgBv = await db.get('welcomechannel')
        const roleReception = '1041164003361169479'

        const embedmember = new EmbedBuilder()
            .setColor("White")
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1086959032373354596/export202303190223379557.png')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**敏 ┈ Boas Vindas ao __Animes Zero__!** <a:heartwhite__AF:1086408498193105007>\n<:sdash_white:1086408454769487915> Leia nossas [regras](https://discord.com/channels/988251099117006878/1076318967368532010) para *evitar punições*.\n<:sdash_white:1086408454769487915> em __dúvidas__, leia nossas [informações](https://discord.com/channels/988251099117006878/1076319178211999795), lá você ficará informado de tudo sobre o servidor. <:shiro:1097558633346248791>`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);

        member.guild.channels.cache.get(`${channelMsgBv}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] })

        await member.send(`junte-se também ao nosso servidor parceiro! 🤍\nNitro • Sorteios • Chats ativos • Amizades • Muito mais!\nhttps://discord.gg/animesk\nhttps://discord.gg/Fs3PmznkBM\nhttps://discord.gg/ZaBDu8fXj8\nhttps://discord.gg/P2nBtJsz6d\nhttps://discord.gg/YsURRYRrZj\nhttps://discord.gg/2fWbpPjG2E\nhttps://i.imgur.com/UhQP3Nx.png`).catch((err) => {
            console.log(`${err} (🚫) ${member.id} tem sua DM Fechada`)
        })

    }
};

