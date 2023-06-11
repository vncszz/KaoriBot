const { Client, ActionRowBuilder, ButtonStyle, ButtonBuilder, GatewayIntentBits, Partials, EmbedBuilder, Collection } = require("discord.js");
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildPresences
  ],
  partials: [
    Partials.User,
    Partials.GuildMember
  ]
});

module.exports = client;
console.clear()

const { Events } = require("discord.js");
const { loadEvents } = require("./Handlers/handlerEvent");
const { loadCommands } = require("./Handlers/handlerCommand");

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


//TICKET 
const discordTranscripts = require('discord-html-transcripts');
const bot = require("./bot.json")

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "denuncia") {
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
          name: `📢﹕denúncia-${interaction.user.tag}`,
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
            .setDescription(`Seu ticket foi criado com sucesso no canal: ${verificado}`)

          const embed2 = new EmbedBuilder()
            .setColor('Random')
            .setTitle("📢 Ticket de Denúncia")
            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
            .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\nEnvie o Id dos denunciados juntamente das provas.`)
            .addFields(
              {
                name: '**__INFORMAÇÕES__**',
                value: `<:user:1081189296972775464> Usuário: ${interaction.user.username}\n<:reply:1117123344337207438>ID: \`${interaction.user.id}\``,
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
            new ButtonBuilder().setCustomId("assumir").setLabel("Assumir").setStyle(ButtonStyle.Primary).setEmoji("👋"),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
          )

          await verificado.send({ content: `${interaction.user} ||<@&${equipeTicket}>|| `, embeds: [embed2], components: [buttons] }).then(m => {
            m.pin();
          })

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

        });
      }
    }

    /// ajuda ou dúvida
    if (interaction.customId === "duvida") {
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
          name: `❓﹕Ajuda/dúvida-${interaction.user.tag}`,
          topic: `${interaction.user.id}`,
          parent: `1076908392125317213`,
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
              id: `1012536412035358770`,// suportes
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            }
          ],
        }).then(async (verificado) => {

          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Seu ticket foi criado com sucesso no canal: ${verificado}`)

          const embed2 = new EmbedBuilder()
            .setColor('Random')
            .setTitle("❓ Ticket de Ajuda/Dúvida")
            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
            .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\nEnvie aqui sua dúvida.`)
            .addFields(
              {
                name: '**__INFORMAÇÕES__**',
                value: `<:user:1081189296972775464> Usuário: ${interaction.user.username}\n<:reply:1117123344337207438>ID: \`${interaction.user.id}\``,
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
            new ButtonBuilder().setCustomId("assumir").setLabel("Assumir").setStyle(ButtonStyle.Primary).setEmoji("👋"),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
          )

          await verificado.send({ content: `${interaction.user} ||<@&${equipeTicket}>|| `, embeds: [embed2], components: [buttons] }).then(m => {
            m.pin();
          })

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

        });
      }
    }
    ///parceria
    if (interaction.customId === "parceria") {
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
          name: `🌸﹕parceria-${interaction.user.tag}`,
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
              id: `1012536412035358770`,// suportes
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            }
          ],
        }).then(async (verificado) => {

          const embed = new EmbedBuilder()
            .setColor('Random')
            .setDescription(`Seu ticket foi criado com sucesso no canal: ${verificado}`)

          const embed2 = new EmbedBuilder()
            .setColor('Random')
            .setTitle("<:partner:1117108229860773958> Ticket de Parceria")
            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
            .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\nBasta aguardar um promotor para fechar sua parceria.`)
            .addFields(
              {
                name: '**__INFORMAÇÕES__**',
                value: `<:user:1081189296972775464> Usuário: ${interaction.user.username}\n<:reply:1117123344337207438>ID: \`${interaction.user.id}\``,
                inline: true,
              },

            )
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1103358017455538277/Screenshot_1.png')
            .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })

          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificado.url)
          )

          let cargo_parceria = '988493069731102760'

          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("assumir").setLabel("Assumir").setStyle(ButtonStyle.Primary).setEmoji("👋"),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
          )

          await verificado.send({ content: `${interaction.user} ||<@&${cargo_parceria}>|| `, embeds: [embed2], components: [buttons] }).then(m => {
            m.pin();
          })

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

        });
      }
    }

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
            new ButtonBuilder().setCustomId("deletar").setLabel("Deletar Ticket").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("trancar").setLabel("Trancar ticket").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("reabrir").setLabel("Reabrir Ticket").setStyle(ButtonStyle.Success),
          )

          interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
        }
      };
    };


    if (interaction.isButton()) {
      if (interaction.customId === "deletar") {
        await interaction.deferUpdate();

        await interaction.channel.send({ content: '> <:lixo:1081185372601585714> | Este canal será deletado em 20 segundos.' }).then(() => {
          setTimeout(() => {
            interaction.channel.delete();
          }, 20000)

        });

        const user = client.users.cache.get(interaction.channel.topic);
        const canal = interaction.channel;

        const transcript = await discordTranscripts.createTranscript(canal, {
          filename: `${user.tag}-${interaction.user.id}.html`,
        });

        await interaction.guild.channels.cache.get("1012536412035358770").send({
          content: `<:reply:1117123344337207438>`,
          files: [transcript],
        })
      };
    };

    if (interaction.isButton()) {
      if (interaction.customId === "trancar") {

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

          interaction.reply({ embeds: [embed2], ephemeral: true });
        };
      }
    }

    if (interaction.customId === "reabrir") {

      const user = client.users.cache.get(interaction.channel.topic);

      interaction.channel.permissionOverwrites.edit(user.id, {
        ViewChannel: true,
        SendMessages: true,
        AttachFiles: true,
        EmbedLinks: true,
        AddReactions: true
      });

      interaction.reply({ content: `**Ticket Reaberto <a:MarkChecking:1102913392206946304>**`, ephemeral: true });
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
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setFooter({ text: `Staff: ${interaction.user.tag}` })

          user.send({ embeds: [embed] }).catch((err) => {
            console.log(`${user.username}(${user.id}) está com sua fechada`);
          });

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor('Random')
                .setTitle("📢 Ticket de Denúncia")
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
                .addFields(
                  {
                    name: '**__INFORMAÇÕES__**',
                    value: `<:user:1081189296972775464> Usuário: ${user.username}\n<:reply:1117123344337207438> ID: \`${user.id}\``,
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
                new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
              )
            ]
          })
        };
      }
    }
  }
})