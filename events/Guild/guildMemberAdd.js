const { EmbedBuilder } = require('discord.js');
const config = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {

        const welcomeMessages = [
            `Seja bem vindo(a) ao servidor ${member}, leia nossas <#1076318967368532010> e fique informado de tudo sobre nosso servidor em <#1130895212588310621> ${config.emojis.kaori_heart}`,
            `Boas vindas ao servidor ${member}, que tal dar uma olhada em nossas <#1076318967368532010>? aproveite e confira as <#1130895212588310621> ${config.emojis.kaori_heart}`,
            `Que bom que você chegou ${member}, mas antes de tudo confira as <#1076318967368532010>, e as <#1130895212588310621> ${config.emojis.kaori_heart}`,
            `Olá ${member} tudo bem? ficamos felizes em ver você por aqui! confira nossas <#1076318967368532010>, e em caso de dúvidas veja as <#1130895212588310621> ${config.emojis.kaori_heart}`,
        ];


        const randomMessageIndex = Math.floor(Math.random() * welcomeMessages.length);
        const randomMessage = welcomeMessages[randomMessageIndex];
        const channelMsgBv = await db.get('welcomechannel')


        let cargos = [
            "1139670671010570281", //Cargo Perso
            "988493074684575795", ///VIPS
            "988493079239594004", //CORES
            "988493090794926220", // LEVEIS
            "1053495699699945572", // ESPECIAIS
            "988493105533714483", // ENTRY
            "988493119953715220", // PINGS
            "988493118993219584" // membros
        ];

        const message = `Seja bem-vindo! Quer uma dica de mais comunidades ativas e divertidas para se juntar? Conheça as comunidades da ***Associação Black Lótus***!  Somos uma central de ajuda para donos de pequenos e grandes servidores mas também oferecemos a possibilidade de você membro acelerar suas: *parcerias, amizades, sorteios, entre outros*!

        ***Visite nosso site oficial com todos servidores participantes e saiba mais sobre nós!***
       https://theblacklotus.fr/servidores-membros.html#hydrus`;

        const embed_member = new EmbedBuilder()
            .setAuthor({name: `${member.guild.name}`,})
            .setColor("White")
            .setThumbnail(member.user.displayAvatarURL({ format: "png", dinamyc: true, size: 4096 }))
            .setDescription(`${randomMessage}`)
            .setImage(`https://media.discordapp.net/attachments/1121941833451323412/1121944697292738610/export202303190223379557.png?width=1025&height=256`)
            .setFooter({ text: `ID: ${member.id}` })

        await member.guild.channels.cache.get(channelMsgBv).send({ content: `${member}`, embeds: [embed_member] })


        try {
            member.roles.add(cargos).catch(() => { })

            member.send(message).catch(() => { })
        } catch (err) { }


    }
}