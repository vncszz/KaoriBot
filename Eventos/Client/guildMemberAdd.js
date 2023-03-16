const client = require('../../index');
const Discord = require("discord.js");

//////////////-------BOAS VINDAS INTERAÇÃO------------///////////////
const { QuickDB } = require('quick.db');
const db = new QuickDB();

client.on('guildMemberAdd', async member => {

    let guild = client.guilds.cache.get('988251099117006878') //ID DO SERVER
    if (guild != member.guild) {

        console.log({
            content: `${member.id} entrou em outro servidor!`
        })
    } else {


        //let channelid = client.channels.cache.get('1076315570615631994') //ID DO CANAL A ENVIAR BOAS VINDAS

        let channelMsgBv = await db.get('channelwelcome.channel')
        let roleReception = '1041164003361169479'

        const embedmember = new Discord.EmbedBuilder()
            .setColor('#73CBEC')
            .setImage('https://cdn.discordapp.com/attachments/1059941914310344845/1062820093354061954/IMG-20230111-WA0016.jpg')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Te desejamos boas vindas ao nosso servidor!**\nLeia nossas [**regras**](https://discord.com/channels/988251099117006878/1076318967368532010) para evitar punições.\nleia nossas [**informações**](https://discord.com/channels/988251099117006878/1076319178211999795) também, lá você ficará informado de tudo possível <:d_02yey:1065719606615998464>\nSabia que você é o **${member.guild.memberCount}º** membro aqui no servidor?`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);


        member.send(`Junte-se também aos nossos servidores parceiro!\nNitro • Sorteios • Chats ativos • Amizades • Muito mais!\nhttps://discord.gg/animebr\nhttps://discord.gg/Tq6Djum3sP\nhttps://discord.gg/ZaBDu8fXj8\nhttps://discord.gg/utk\nhttps://discord.gg/wildriftbrasil\nhttps://discord.gg/2fWbpPjG2E\nhttps://i.imgur.com/UhQP3Nx.png`)

        await member.guild.channels.cache.get(`${channelMsgBv.id}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] });

    }

})