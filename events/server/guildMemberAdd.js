const { QuickDB } = require('quick.db');
const db = new QuickDB();
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "guildMemberAdd",

    async execute(member) {

        let channelMsgBv = await db.get('channelwelcomechannel') // seta o canal por comando
        //let channelMsgBv = '1088048248213753906' // envia no canal sem setar
        let roleReception = '1041164003361169479'

        const embedmember = new EmbedBuilder()
            .setColor('White')
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1086959032373354596/export202303190223379557.png')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**__敏' ┈ Boas Vindas ao Animes Zero__! <a:heartwhite__AF:1086408498193105007>**\n<:sdash_white:1086408454769487915> Leia nossas [**regras**](https://discord.com/channels/988251099117006878/1076318967368532010) para *evitar punições*.\n<:sdash_white:1086408454769487915> em __Dúvidas__, leia nossas [**informações**](https://discord.com/channels/988251099117006878/1076319178211999795), lá você ficará informado de tudo sobre o servidor. <:d_02yey:1065719606615998464>`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);

        member.guild.channels.cache.get(`${channelMsgBv}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] })

        let embed = new EmbedBuilder()
            .setColor("White")
            .setTitle(`Anime's Zero™`)
            .setDescription(`Bem Vindo(a) ${member.user} ao servidor <:welcome:990287569780613152>\nEsperamos que você goste e divirta-se!`)
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1086364997011112026/492_Sem_Titulo_20230317160346.png')
            .setFooter({ text: `©Anime's Zero™ - Todos os Direitos Reservados.` });

        member.send({ content: `discord.gg/animesbrasil`, embeds: [embed] }).catch(err => {
            console.log(`(🚫) ${member.id} está com sua DM Fechada!`)
        });
    }
} 