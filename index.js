const { Partials, Client, ActionRowBuilder, ButtonStyle, ButtonBuilder, GatewayIntentBits, EmbedBuilder, Collection } = require("discord.js");
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions
  ],
  partials: [
    Partials.User,
    Partials.GuildMember,
    Partials.Message,
    Partials.ThreadMember,
    Partials.GuildScheduledEvent,
    Partials.Channel
  ],
});

module.exports = client;
console.clear()

const { Events } = require("discord.js");
const { loadEvents } = require("./handlers/handlerEvent");
const { loadCommands } = require("./handlers/handlerCommand");

client.commands = new Collection();
client.events = new Collection();
client.modals = new Collection();


process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});

client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});


////captcha
const { CaptchaGenerator } = require('captcha-canvas');
const capschema = require('./Models/verify');
const verifyusers = require('./Models/verifyUsers');
const { AttachmentBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require("discord.js")

client.on(Events.InteractionCreate, async interaction => {

  if (interaction.guild === null) return;

  const verifydata = await capschema.findOne({ Guild: interaction.guild.id });
  const verifyusersdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

  if (interaction.customId === 'verify') {

    if (!verifydata) return await interaction.reply({ content: `The **verification system** has been disabled in this server!`, ephemeral: true });

    if (verifydata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: 'You have **already** been verified!', ephemeral: true })
    else {

      let letter = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'f', 'F', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T', 'u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z',]
      let result = Math.floor(Math.random() * letter.length);
      let result2 = Math.floor(Math.random() * letter.length);
      let result3 = Math.floor(Math.random() * letter.length);
      let result4 = Math.floor(Math.random() * letter.length);
      let result5 = Math.floor(Math.random() * letter.length);

      const cap = letter[result] + letter[result2] + letter[result3] + letter[result4] + letter[result5];
      console.log(cap)

      const captcha = new CaptchaGenerator()
        .setDimension(150, 450)
        .setCaptcha({ text: `${cap}`, size: 60, color: "red" })
        .setDecoy({ opacity: 0.5 })
        .setTrace({ color: "red" })

      const buffer = captcha.generateSync();

      const verifyattachment = new AttachmentBuilder(buffer, { name: `captcha.png` });

      const verifyembed = new EmbedBuilder()
        .setColor('Green')
        .setAuthor({ name: `✅ Verification Proccess` })
        .setFooter({ text: `✅ Verification Captcha` })
        .setTimestamp()
        .setImage('attachment://captcha.png')
        .setThumbnail(interaction.guild.iconURL())
        .setTitle('> Verification Step: Captcha')
        .addFields({ name: `• Verifique-se`, value: '> Use o botão abaixo para \n> enviar seu captcha!' })

      const verifybutton = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setLabel('✅ Inserir Captcha')
            .setStyle(ButtonStyle.Success)
            .setCustomId('captchaenter')
        )

      const vermodal = new ModalBuilder()
        .setTitle('Verification')
        .setCustomId('vermodal')

      const answer = new TextInputBuilder()
        .setCustomId('answer')
        .setRequired(true)
        .setLabel('• Digite o Código Aqui')
        .setPlaceholder('Your captcha code')
        .setStyle(TextInputStyle.Short)

      const vermodalrow = new ActionRowBuilder().addComponents(answer);
      vermodal.addComponents(vermodalrow);

      const vermsg = await interaction.reply({ embeds: [verifyembed], components: [verifybutton], ephemeral: true, files: [verifyattachment] });

      const vercollector = vermsg.createMessageComponentCollector();

      vercollector.on('collect', async i => {

        if (i.customId === 'captchaenter') {
          i.showModal(vermodal);
        }

      })

      if (verifyusersdata) {

        await verifyusers.deleteMany({
          Guild: interaction.guild.id,
          User: interaction.user.id
        })

        await verifyusers.create({
          Guild: interaction.guild.id,
          User: interaction.user.id,
          Key: cap
        })

      } else {

        await verifyusers.create({
          Guild: interaction.guild.id,
          User: interaction.user.id,
          Key: cap
        })

      }
    }
  }
})

client.on(Events.InteractionCreate, async interaction => {

  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'vermodal') {

    const userverdata = await verifyusers.findOne({ Guild: interaction.guild.id, User: interaction.user.id });
    const verificationdata = await capschema.findOne({ Guild: interaction.guild.id });

    if (verificationdata.Verified.includes(interaction.user.id)) return await interaction.reply({ content: `Você **já** verificou neste servidor!`, ephemeral: true });

    const modalanswer = interaction.fields.getTextInputValue('answer');
    if (modalanswer === userverdata.Key) {

      const verrole = await interaction.guild.roles.cache.get(verificationdata.Role);

      try {
        await interaction.member.roles.add(verrole);
      } catch (err) {
        return await interaction.reply({ content: `Houve um **problema** dando a você o cargo **<@&${verificationdata.Role}>**, tente novamente mais tarde!`, ephemeral: true })
      }

      await interaction.reply({ content: 'Você foi **verificado!**', ephemeral: true });
      await capschema.updateOne({ Guild: interaction.guild.id }, { $push: { Verified: interaction.user.id } });

    } else {
      await interaction.reply({ content: `**Oops!** Parece que você **não** digitou o **código captcha** válido!`, ephemeral: true })
    }
  }
})


//// ticket
const discordTranscripts = require('discord-html-transcripts');

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "ticket") {
      const verificar = interaction.guild.channels.cache.find((g) => g.topic === interaction.user.id);

      if (verificar) {

        const embed = new EmbedBuilder()
          .setColor('Random')
          .setDescription(`${interaction.user} Você já tem um ticket aberto no canal: ${verificar}`)

        const atalho = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificar.url)
        )

        interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true });
      } else {
        interaction.guild.channels.create({
          name: `suporte-${interaction.user.tag}`,
          topic: `${interaction.user.id}`,
          parent: `1103832124689240084`,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: ["ViewChannel"]
            },
            {
              id: interaction.user.id,
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            },
            {
              id: `1012536412035358770`,
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            }
          ],
        }).then(async (verificado) => {

          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`${interaction.user} Seu ticket foi criado com sucesso no canal: ${verificado}`)

          const embed2 = new EmbedBuilder()
            .setColor('Random')
            .setTitle("Suporte Ticket")
            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
            .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
            .addFields(
              {
                name: '**__INFORMAÇÕES__**',
                value: `<:ArrowForward:1102914046916833321> Usuário: ${interaction.user.username}\n<:ArrowForward:1102914046916833321> ID: \`(${interaction.user.id})\``,
                inline: true,
              },

            )
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1103358017455538277/Screenshot_1.png')
            .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })

          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificado.url)
          )

          let equipeTicket = '1012536412035358770'

          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("assumir").setLabel("Atender").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("sair").setLabel("Sair do ticket").setStyle(ButtonStyle.Danger),
          )

          await verificado.send({ content: `${interaction.user} ||<@&${equipeTicket}>|| `, embeds: [embed2], components: [buttons] }).then(m => {
            m.pin();
          })

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

        });
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === "comprar_vip") {
        const verificar = interaction.guild.channels.cache.find((g) => g.topic === interaction.user.id);

        if (verificar) {

          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`${interaction.user} Você já tem um ticket aberto no canal: ${verificar}`)

          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Canal").setStyle(ButtonStyle.Link).setURL(verificar.url)
          )

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true });
        } else {
          interaction.guild.channels.create({
            name: `compra-${interaction.user.tag}`,
            topic: `${interaction.user.id}`,
            parent: `1103832124689240084`,
            permissionOverwrites: [
              {
                id: interaction.guild.id,
                deny: ["ViewChannel"]
              },
              {
                id: interaction.user.id,
                allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
              },
            ],
          }).then(async (verificado) => {

            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`${interaction.user} Seu ticket foi criado com sucesso no canal: ${verificado}`)

            const buttons = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Primary),
            )

            const embed2 = new EmbedBuilder()
              .setColor('Random')
              .setTitle("Compra de Vip | Ticket")
              .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
              .setDescription(`Seja bem vindo(a) ao seu **Ticket** ${interaction.user}\n\nEsse suporte é disponível apenas para os donos do servidor. Lista dos Vips estão em <#1076319647890149496>`)
              .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1103358017455538277/Screenshot_1.png')
              .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })

            const atalho = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificado.url)
            )

            await verificado.send({ content: `${interaction.user}`, embeds: [embed2], components: [buttons] }).then(m => {
              m.pin();
            })

            interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

          });
        }
      }

      //  
      if (interaction.isButton()) {
        if (interaction.customId === "painel") {
          if (!interaction.member.roles.cache.get("1012536412035358770")) {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`🚫 Permissão Negada.`)

            interaction.reply({ embeds: [embed], ephemeral: true });
          } else {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`Bem vindo ao Painel Staff, ${interaction.user} \n\n**🚯 Deletar:** Deleta o ticket.\n**🔓 Reabrir:** Use para reabrir o ticket do usuário, .\n🔒 Fechar Ticket: Tranque o canal e tire as permissões do membro.`)

            const buttons = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("notificar").setLabel("Notificar Usuário").setStyle(ButtonStyle.Secondary),
              new ButtonBuilder().setCustomId("deletar").setLabel("Deletar Ticket").setStyle(ButtonStyle.Danger),
              new ButtonBuilder().setCustomId("fechar").setLabel("Trancar ticket").setStyle(ButtonStyle.Primary),
              new ButtonBuilder().setCustomId("reabrir").setLabel("Reabrir Ticket").setStyle(ButtonStyle.Success),
            )

            interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
          }
        };
      };

      if (interaction.isButton()) {
        if (interaction.customId === "notificar") {
          await interaction.deferUpdate();
          const user = client.users.cache.get(interaction.channel.topic);

          const embed_user = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`${user} Um staff respondeu o seu ticket!`)

          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(interaction.channel.url)
          )

          user.send({ embeds: [embed_user], components: [atalho] }).catch((err) => {
            console.log(`${user.username}(${user.id}) está com sua Dm fechada`);
          })
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId === "sair") {
          await interaction.deferUpdate();
          const user = client.users.cache.get(interaction.channel.topic);

          if (interaction.user.id !== user.id) {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`${interaction.user} Você não pode sair desse ticket.`)

            interaction.reply({ embeds: [embed], ephemeral: true });
          } else {
            interaction.channel.permissionOverwrites.edit(user.id, {
              ViewChannel: false,
              SendMessages: false,
              AttachFiles: false,
              EmbedLinks: false,
              AddReactions: false
            });

            const embed = new EmbedBuilder()
              .setColor("Random")
              .setDescription(`${user} Saiu do ticket`)

            interaction.channel.send({ embeds: [embed] });
          }
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId === "fechar2") {
          if (!interaction.member.roles.cache.get("1012536412035358770")) {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`🚫 Permissão Negada.`)

            interaction.reply({ embeds: [embed], ephemeral: true });
          } else {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`${interaction.user} Confirme suas ações.\n\n**🚯 Deletar:** Deleta o ticket.\n**🔓 Reabrir:** Use para reabrir e o usuário mandar mensagem novamente.\n🔒 Fechar Ticket: Tranque o canal e tire as permissões do membro.`)

            const buttons = new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("deletar").setLabel("Deletar Ticket").setStyle(ButtonStyle.Danger),
            )

            interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
          }
        }
      }

      if (interaction.isButton()) {
        if (interaction.customId === "deletar") {
          await interaction.deferUpdate();

          /*const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Este canal será deletado em 20 segundos.`)*/

          await interaction.channel.send({ content: 'Este canal será deletado em 20 segundos.' }).then(() => {
            setTimeout(() => {
              interaction.channel.delete();
            }, 20000)

          });

          const user = client.users.cache.get(interaction.channel.topic);
          const canal = interaction.channel;

          const transcript = await discordTranscripts.createTranscript(canal, {
            filename: `${user.tag}-${interaction.user.id}.html`,
          });

          const embed_log = new EmbedBuilder()
            .setColor("DarkRed")
            .setFields(
              { name: `Ticket Aberto Por: `, value: `\`${user.tag}\``, inline: true },
              { name: `Ticket Salvo Por:`, value: `\`${interaction.user.tag}\``, inline: true },
              { name: `Data / Horário`, value: `\`${interaction.createdAt.toLocaleDateString()}, ${interaction.createdAt.toLocaleTimeString()}\``, inline: true },
            )

          await interaction.guild.channels.cache.get("1087511879104090122").send({
            embeds: [embed_log],
            files: [transcript],
          })
        };
      };

      if (interaction.isButton()) {
        if (interaction.customId === "fechar") {

          const user = client.users.cache.get(interaction.channel.topic);

          if (!interaction.member.roles.cache.get("1012536412035358770")) {
            const embed = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`🚫 Permissão Negada. `)

            interaction.reply({ embeds: [embed], ephemeral: true });
          } else {
            const embed2 = new EmbedBuilder()
              .setColor('Random')
              .setDescription(`O ticket foi fechado por: ${interaction.user}`)

            interaction.channel.permissionOverwrites.edit(user.id, {
              ViewChannel: false,
              SendMessages: false,
              AttachFiles: false,
              EmbedLinks: false,
              AddReactions: false
            });

            user.send({ embeds: [embed2] }).catch((err) => {
              console.log(`${user.username}(${user.id}) está com sua fechada`);
            })
            interaction.reply({ embeds: [embed2], ephemeral: true });
          };
        }
      }

      if (interaction.customId === "reabrir") {

        const user = client.users.cache.get(interaction.channel.topic);

        const embed = new EmbedBuilder()
          .setColor('Random')
          .setDescription(`${user} Um staff reabriu o seu ticket`)

        const embed2 = new EmbedBuilder()
          .setColor('Random')
          .setDescription(`o ticket foi reaberto com sucesso`)

        const atalho = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(interaction.channel.url),

        )

        interaction.channel.permissionOverwrites.edit(user.id, {
          ViewChannel: true,
          SendMessages: true,
          AttachFiles: true,
          EmbedLinks: true,
          AddReactions: true
        });


        user.send({ embeds: [embed], components: [atalho] }).catch((err) => {
          console.log(`${user.username}(${user.id}) está com sua dm fechada`);
        })
        interaction.reply({ embeds: [embed2], ephemeral: true });
      }

      if (interaction.isButton()) {
        if (interaction.customId === "sim") {
          await interaction.deferUpdate();

          interaction.editReply({
            content: `Ação confirmada <a:MarkChecking:1102913392206946304>`,
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("aceppt").setLabel("Acão Confirmada.").setStyle(ButtonStyle.Secondary).setDisabled(true),
              )
            ]

          })

          /*const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Este canal será deletado em 20 segundos.`)*/

          await interaction.channel.send({ content: `Este canal será deletado em 20 segundos.` }).then(() => {
            setTimeout(() => {
              interaction.channel.delete();
            }, 20000)

          });

          const user = client.users.cache.get(interaction.channel.topic);
          const canal = interaction.channel;

          const transcript = await discordTranscripts.createTranscript(canal, {
            filename: `${user.tag}-${interaction.user.id}.html`,
          });

          const embed_log = new EmbedBuilder()
            .setColor("DarkRed")
            .setFields(
              { name: `Ticket Aberto Por: `, value: `\`${user.tag}\``, inline: true },
              { name: `Ticket Salvo Por:`, value: `\`${interaction.user.tag}\``, inline: true },
              { name: `Data / Horário`, value: `\`${interaction.createdAt.toLocaleDateString()}, ${interaction.createdAt.toLocaleTimeString()}\``, inline: true },
            )

          await interaction.guild.channels.cache.get("1087511879104090122").send({
            embeds: [embed_log],
            files: [transcript],
          })

        };

      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === 'nao') {

        await interaction.deferUpdate();

        interaction.editReply({
          content: `Ação desfeita <a:MarkChecking:1102913392206946304>`,
          components: [
            new ActionRowBuilder().addComponents(
              new ButtonBuilder().setCustomId("cancell").setLabel("Acão Desfeita.").setStyle(ButtonStyle.Secondary).setDisabled(true),
            )
          ]

        })

      };

    }

    if (interaction.isButton()) {
      if (interaction.customId === "assumir") {

        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`🚫 Permissão Negada.`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          await interaction.deferUpdate();

          const user = client.users.cache.get(interaction.channel.topic);

          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`${interaction.user} Um staff assumiu o seu ticket`)

          user.send({ embeds: [embed] }).catch((err) => {
            console.log(`${user.username}(${user.id}) está com sua fechada`);
          });

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('Random')
                .setTitle("Ticket Atendido")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
                .addFields(
                  {
                    name: '**__INFORMAÇÕES__**',
                    value: `<:ArrowForward:1102914046916833321> Usuário: ${user.username}\n<:ArrowForward:1102914046916833321> ID: \`(${user.id})\``,
                    inline: true,
                  },
                  {
                    name: ' **__TICKET CLAIM__**',
                    value: `<a:yellowcrown:1102914316178554880> Staff: ${interaction.user}`
                  }

                )
                .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1103358017455538277/Screenshot_1.png')
                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
            ],
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary),
              )
            ]
          })
        };
      }
    }
  }
})