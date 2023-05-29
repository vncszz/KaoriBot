const { EmbedBuilder } = require('discord.js');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const channelMsgBv = await db.get('welcomechannel')
        const roleReception = '1041164003361169479'

        const embedmember = new EmbedBuilder()
            .setColor("White")
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1086959032373354596/export202303190223379557.png')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**敏 ┈ Boas Vindas ao Anime's Zero!** <a:heartwhite__AF:1086408498193105007>\n<:sdash_white:1086408454769487915> Leia nossas [regras](https://discord.com/channels/988251099117006878/1076318967368532010) para *evitar punições*.\n<:sdash_white:1086408454769487915> em __dúvidas__, leia nossas [informações](https://discord.com/channels/988251099117006878/1076319178211999795), lá você ficará informado de tudo sobre o servidor. <:shiro:1097558633346248791>`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);

        await member.guild.channels.cache.get(`${channelMsgBv}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] })

        await member.send(`
Seja bem-vindo! Quer uma dica de mais comunidades ativas e divertidas para se juntar? Conheça as comunidades da ***Associação Black Lótus***!  Somos uma central de ajuda para donos de pequenos e grandes servidores mas também oferecemos a possibilidade de você membro acelerar suas: *parcerias, amizades, sorteios, entre outros*!

***Visite nosso site oficial com todos servidores participantes e saiba mais sobre nós!***
https://theblacklotus.fr/servidores-membros.html#hydrus`).catch((err) => {
            console.log(`(🚫) ${member.id} tem sua DM Fechada`)
        });
    }
};