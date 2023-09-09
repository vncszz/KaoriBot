///////// 
const { Blacklist } = require('../../blacklist.json')
const urls = require('url');
const { Token } = require('../../config.json')
const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/ig
const client = require("../../index")
const { Events } = require("discord.js");


module.exports = {
    name: Events.MessageCreate,

    async execute(message) {
        if (message.author.bot) return;
        if (client.user.id === message.author.id) return;

        const { guild } = (message);
        const channel_logs = guild.channels.cache.get("1076320030972715128");

        const regpart2 = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=\-]{2,256}\.[a-z,\-]{2,10}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/igm
        const regsub = /(?<protocol>\w*)\:\/\/(?:(?:(?<thld>[\w\-]*)(?:\.))?(?<sld>[\w\-]*))\.(?<tld>\w*)(?:\:(?<port>\d*))?/igm

        async function clus(urlin) {
            for (let index = 0; index < urlin?.length; index++) {
                let datas = urls.parse(urlin[index])["hostname"]
                if (datas === undefined || datas === null) {
                    datas = urls.parse(urlin[index])["href"]
                    if (datas.match(regsub) !== null) {
                        datas = datas.match(regsub)[0]
                    }
                } else {
                    datas = `https://${datas}`
                    datas = urls.parse(datas)['hostname']
                }

                if (Blacklist.includes(datas)) {
                    message.delete()
                        .then(data => { channel_logs.send(`<@${message.author.id}> enviou um **link/palavra** suspeita!\n> Conteúdo: \`${datas}\``) })
                        .catch(data => { channel_logs.send(`palavra perigosa detectada! ${datas} )`) })
                    break;
                }
            }
        }
        if (JSON.stringify(message).match(regpart2) !== null) { clus(JSON.stringify(message).match(regpart2)) }
    }
}