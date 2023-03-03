const Discord = require("discord.js")
const config = require("./config.json")
const client = new Discord.Client({ intents: 32767 });
const { MessageEmbed } = require('discord.js')

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
})

client.once('ready', async () => {

  console.log(`🎈 - ${client.user.tag} Foi iniciada em ${client.guilds.cache.size} servidores!\n👑 - Tendo acesso a ${client.channels.cache.size} canais!\n❣️ - Contendo ${client.users.cache.size} usuarios!`)
  let activities = [
    `🌐 v${require('discord.js').version.slice(0, 6)}`,
    //`🔧 Em Manutenção.`
  ],
    i = 0;
  setInterval(() => client.user.setActivity(`${activities[i++ % activities.length]}`, {
  }), 5000);
  client.user
    .setStatus('online')
})


client.slashCommands = new Discord.Collection()
require('./handler')(client)

client.login(config.token)

process.on('multipleResolutions', (type, reason, promise) => {
  console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});

process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});

/////

const discordTranscripts = require('discord-html-transcripts');
const { QuickDB } = require('quick.db')
const db = new QuickDB;

client.on("interactionCreate", async interaction => {
  if (interaction.isStringSelectMenu()) {
    let choice = interaction.values[0]
    const member = interaction.member
    const guild = interaction.guild
    if (choice == 'duvida') {
      let embedDuvida = new Discord.EmbedBuilder()
        .setColor('Random')
        .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
        .setDescription(`- **Essa opção ainda está em desenvolvimento, pedimos para que utilize a primeira opção acima.**`)
      interaction.reply({ embeds: [embedDuvida], ephemeral: true })
    }

    else if (choice == 'ticket') {
      if (interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.user.username}`)) {
        let canal = interaction.guild.channels.cache.find(ca => ca.name === `ticket-${member.user.username}`);

        let jaTem = new Discord.EmbedBuilder()
          .setDescription(`❌ **Calma! Você já tem um ticket criado em: ${canal}.**`)
          .setColor('Red')

        interaction.reply({ embeds: [jaTem], ephemeral: true })
      } else {

        let cargoTicket = await db.get("cargoModerate.cargoM"); //Cargo dos STAFF's
        let CategoriaTicket = await db.get('Categoria.Categoria') //Categoria que o Ticket será criado

        guild.channels.create({

          name: `ticket-${member.user.username}`,
          type: 0,
          parent: `${CategoriaTicket.id}`, //Categoria
          topic: interaction.user.id,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
            },
            {
              id: member.id,
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles"]
            },
            {
              id: cargoTicket.id,  //Cargo STAFF
              allow: ["ViewChannel", "SendMessages", "AddReactions", "AttachFiles", "ManageMessages"]
            }
          ]

        }).then((ca) => {
          interaction.reply({ content: `**\🎟 - Criando Ticket...**`, ephemeral: true }).then(() => {
            setTimeout(() => {
              let direciandoaocanal = new Discord.ActionRowBuilder().addComponents(
                new Discord.ButtonBuilder()
                  .setLabel(`Acessar canal`)
                  .setEmoji(`<:disco:1079473545987506267>`)
                  .setStyle(5)
                  .setURL(`https://discord.com/channels/${interaction.guild.id}/${ca.id}`)
              )
              interaction.editReply({ content: `**✅ - Ticket criado, clique no botão abaixo para ser redirecionado**`, ephemeral: true, components: [direciandoaocanal] })
            }, 670)
          })

          let roleTicket = '1012536412035358770'
          let embedCanalTicket = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
            .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`*Bem vindo ao suporte via ticket!\n Deixe claro oque deseja com nossa staff para um melhor atendimento.*`)
            .setTimestamp(new Date)


          let FecharTicket = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setLabel(` Fechar & Salvar`)
              .setEmoji(`🔒`)
              .setCustomId('fechar')
              .setStyle(Discord.ButtonStyle.Primary),

          )

          ca.send({ embeds: [embedCanalTicket], components: [FecharTicket], content: `||${interaction.user}|| <@&${roleTicket}>` }).then(msg => {
            msg.pin()
          });
        })
      }

    }
  }
  if (interaction.isButton) {
    if (interaction.customId === "fechar") {
      let cargoTicket2 = await db.get("cargoModerate.cargoM");
      if (!interaction.member.roles.cache.some(role => role.id == cargoTicket2.id)) {
        interaction.reply({ content: `**❌ - Apenas STAFF's podem selecionar esta opção!**`, ephemeral: true })
      } else {
        const modalTicket = new Discord.ModalBuilder()
          .setCustomId('modal_ticket')
          .setTitle(`Fechar - Ticket`)
        const resposta1 = new Discord.TextInputBuilder()
          .setCustomId('resposta')
          .setLabel('Diga-nos a razão de fechar o ticket:')
          .setStyle(Discord.TextInputStyle.Paragraph)

        const firstActionRow = new Discord.ActionRowBuilder().addComponents(resposta1);
        modalTicket.addComponents(firstActionRow)
        await interaction.showModal(modalTicket);
      }

    }
  };
  if (!interaction.isModalSubmit()) return;
  if (interaction.customId === 'modal_ticket') {
    const respostaFinal = interaction.fields.getTextInputValue('resposta');

    interaction.reply({
      content: `**✅ - Resposta enviada, canal será deletado em 3s**`, ephemeral: true
    }).then((aviso) => {
      setTimeout(() => {
        interaction.editReply({
          content: `**✅ - Resposta enviada, canal será deletado em 2s**`, ephemeral: true
        }, 1000).then((aviso1) => {
          setTimeout(() => {
            interaction.editReply({
              content: `**✅ - Resposta enviada, canal será deletado em 1s**`, ephemeral: true
            })
          }, 1000);
        })
          .then(() => {
            setTimeout(async () => {
              const cliente = interaction.guild.members.cache.get(
                interaction.channel.topic.slice(0, 18)
              );

              let channel = interaction.channel;
              const attachment = await discordTranscripts.createTranscript(channel, {
                fileName: `${channel.name}.html`,
              });

              interaction.channel.delete();
              const channelDeleted = interaction.channel.name;

              let embedLog = new Discord.EmbedBuilder()

                .setAuthor({ name: `${cliente.user}`, iconURL: `${cliente.user.displayAvatarURL()}` })
                .setColor('Red')
                .setTitle(`${channelDeleted}`)
                .setDescription(`*Ticket fechado, informações:* \n**(Transcripts Anexados)**\n`)
                .addFields(
                  {
                    name: `🆔 - ID de quem fechou:`,
                    value: `\`\`\`${interaction.user.id}\`\`\``,
                    inline: true,
                  },
                  {
                    name: `🆔 - ID de quem abriu:`,
                    value: `\`\`\`${cliente.id}\`\`\``,
                    inline: true,
                  },
                  {
                    name: `💬 - Quem fechou:`,
                    value: `${interaction.user}`,
                    inline: false,
                  },
                  {
                    name: `💬 - Quem abriu:`,
                    value: `${cliente.user}`,
                    inline: false,
                  },
                  {
                    name: `🎫 - Ticket:`,
                    value: `${channelDeleted}`,
                    inline: true,
                  },
                  {
                    name: '📕 - Motivo do Fechamento:',
                    value: `\`\`\`${respostaFinal}\`\`\``,
                    inline: false,
                  },
                )
                .setTimestamp()
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)

              let embedLogUser = new Discord.EmbedBuilder()

                .setAuthor({ name: `${cliente.user.username}`, iconURL: `${cliente.user.displayAvatarURL()}` })
                .setColor('Green')
                .setTitle(`Ticket Fechado!`)
                .setDescription(`*Ticket fechado, informações:*`)
                .addFields(
                  {
                    name: `💬 - Quem fechou:`,
                    value: `${interaction.user}`,
                    inline: false,
                  },
                  {
                    name: `💬 - Quem abriu:`,
                    value: `${cliente.user}`,
                    inline: false,
                  },
                  {
                    name: '📕 - Motivo do Fechamento:',
                    value: `\`\`\`${respostaFinal}\`\`\``,
                    inline: false,
                  },
                )
                .setTimestamp()
                .setThumbnail(`${cliente.user.displayAvatarURL()}`)
                .setFooter({ text: `Ticket fechado por: ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

              let canalLogsT = await db.get('channelLogTicket.channel')


              cliente.user.send({ embeds: [embedLogUser] })
              await interaction.guild.channels.cache.get(`${canalLogsT.id}`).send({ content: `\`💾 - Transcript ⤵\``, files: [attachment], embeds: [embedLog] })
            }, 1000);
          });
      });
    });
  };
});

///responder menção
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



//// boas vindas

////////////////////////
client.on('guildMemberAdd', async member => {

  let guild = client.guilds.cache.get('988251099117006878') //ID DO SERVER
  if (guild != member.guild) {
      
      console.log({
          content: `${member.id} entrou em outro servidor!`
      })
  } else {

      
      let channelid = client.channels.cache.get('1077937353445888032') //ID DO CANAL A ENVIAR BOAS VINDAS
      let roleReception = '1041164003361169479'
      
      const embedmember = new Discord.EmbedBuilder()
          .setColor('#73CBEC')
          .setImage('https://cdn.discordapp.com/attachments/1059941914310344845/1062820093354061954/IMG-20230111-WA0016.jpg')
          .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
          .setDescription(`**Te desejamos boas vindas ao nosso servidor!**\nLeia nossas [**regras**](https://discord.com/channels/988251099117006878/1076318967368532010) para evitar punições.\nleia nossas [**informações**](https://discord.com/channels/988251099117006878/1076319178211999795) também, lá você ficará informado de tudo possível <:d_02yey:1065719606615998464>`)
          .setFooter({text: `ID: ${member.id}`, iconURL: member.user.displayAvatarURL({dynamic: true})})
          .setTimestamp(new Date);

      member.send(`https://discord.gg/QCmhuke4cz\nhttps://discord.gg/Tq6Djum3sP\nhttps://discord.gg/ZaBDu8fXj8\nhttps://discord.gg/utk\nhttps://discord.gg/wildriftbrasil\nhttps://discord.gg/2fWbpPjG2E\nhttps://i.imgur.com/UhQP3Nx.png`)
      
      channelid.send({
          content: `${member} <@&${roleReception}>`,
          embeds: [embedmember]
      });
      
  }
  
})
