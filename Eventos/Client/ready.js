const client = require('../../index');
const Discord = require("discord.js");
const chalk = require("chalk");

client.on(`ready`, async () => {

    //Atividade & Status.
    const atividade = [{ name: `.gg/animesbrasil`, type: 0 }, { name: `Anime's Zero™`, type: 3 }];
    const status = [`online`];

    let random1 = 0;

    setInterval(() => {
        if (random1 >= atividade.length) random1 = 0

        client.user.setActivity(atividade[random1])

        random1++
    }, 10000)

    let random2 = 0;

    setInterval(() => {
        if (random2 >= atividade.length) random2 = 0

        client.user.setStatus(status[random2])

        random2++
    }, 25000)

    console.log(chalk.hex(`4169E1`).bold(`[Bot-Status] > Estou online como: ${client.user.username}`))

});

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
            .setColor('White')
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1086959032373354596/export202303190223379557.png')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**__敏' ┈ Boas Vindas ao Animes Zero__! <a:heartwhite__AF:1086408498193105007>**\n<:sdash_white:1086408454769487915> Leia nossas [**regras**](https://discord.com/channels/988251099117006878/1076318967368532010) para *evitar punições*.\n<:sdash_white:1086408454769487915> em __Dúvidas__, leia nossas [**informações**](https://discord.com/channels/988251099117006878/1076319178211999795), lá você ficará informado de tudo sobre o servidor. <:d_02yey:1065719606615998464>`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);

        member.guild.channels.cache.get(`${channelMsgBv.id}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] })

        await member.send('Obrigado por entrar em nosso servidor! esperamos que goste 💖').catch(e => {
            console.log(`(🚫) ${member.id} tem sua DM Fechada!`)

        });
    };

});


//mensagem automatica
client.on("ready", () => {

    const canal = client.channels.cache.get('1083539979101290666') // Coloque o ID do canal de texto.
    console.log(`O sistema de mensagens temporárias está ativado!`)

    let embed = new Discord.EmbedBuilder()
        .setColor('White')
        .setDescription(`Eiii você aí, você mesmo!\nNão perca o evento que está acontecendo nesse exato momento!\nPasse no <#1086805856760369152> e escolhe sua casa!`)
        //.setFooter({text: `©Anime's Zero™`})
        //.setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }));
        .setTimestamp()

    setInterval(function () {

        canal.send({ embeds: [embed] }).catch(e => {
            console.log('erro ao enviar mensagens automaticas')
        })

    }, 10000) // Coloque o tempo em milisegundos. Exemplo: 10000 = 10 segs;

})