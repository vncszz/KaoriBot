const client = require('../../index');
const Discord = require("discord.js");
const chalk = require("chalk");

client.on(`ready`, async () => {

    //Atividade & Status.
    const atividade = [{ name: `discord.gg/animesbrasil`, type: 0 }, { name: `Entre em meu servidor!`, type: 3 }];
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
            .setColor('#73CBEC')
            .setImage('https://cdn.discordapp.com/attachments/1059941914310344845/1062820093354061954/IMG-20230111-WA0016.jpg')
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Te desejamos boas vindas ao nosso servidor!**\nLeia nossas [**regras**](https://discord.com/channels/988251099117006878/1076318967368532010) para evitar punições.\nleia nossas [**informações**](https://discord.com/channels/988251099117006878/1076319178211999795) também, lá você ficará informado de tudo possível <:d_02yey:1065719606615998464>`)
            .setFooter({ text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
            .setTimestamp(new Date);


        member.send(`Junte-se também aos nossos servidores parceiro!  
  Nitro • Sorteios • Chats ativos • Amizades • Muito mais!
  https://discord.gg/QCmhuke4cz\nhttps://discord.gg/Tq6Djum3sP\nhttps://discord.gg/ZaBDu8fXj8\nhttps://discord.gg/utk\nhttps://discord.gg/wildriftbrasil\nhttps://discord.gg/2fWbpPjG2E\nhttps://i.imgur.com/UhQP3Nx.png`)

        await member.guild.channels.cache.get(`${channelMsgBv.id}`).send({ content: `${member} <@&${roleReception}>`, embeds: [embedmember] });

    }

})

///////////////////----------------------------MENTION REPLY----------------------//////////////////

client.on("messageCreate", (message) => {
    if (message.author.bot) return;

    let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`]

    mencoes.forEach(element => {
        if (message.content === element) {

            //(message.content.includes(element)) // caso queira que responda com menção em alguma mensagem

            let embed = new Discord.EmbedBuilder()
                .setColor("#000000")
                .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynaimc: true }) })
                .setDescription(`🤖 Olá ${message.author}, utilize \`/ajuda\` para ver meus comandos!`)

            message.reply({ embeds: [embed] })
        }
    })

})