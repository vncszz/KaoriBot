const { Partials, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
const bot = require("./bot.json");
const discordTranscripts = require('discord-html-transcripts');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const fs = require("fs");
require('dotenv').config();

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildModeration,
    Discord.GatewayIntentBits.GuildPresences
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User
  ]
});

console.clear()

const { Events } = require("discord.js");
const { loadEvents } = require("./handlers/handlerEvent");
const { loadCommands } = require("./handlers/handlerCommand");
const { loadModals } = require('./events/functions/modalCreate');

//database connect
const connectiondb = require("./database/connect")
connectiondb.start();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./PrefixCommands/`);
client.events = new Discord.Collection();
client.modals = new Discord.Collection();
loadModals(client);

/*
//ANTICRASH
process.on('unhandRejection', (reason, promise) => {
  console.log(`🚫 | [Erro]\n\n` + reason, promise);
});
process.on('uncaughtException', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
  console.log(`🚫 | [Erro]\n\n` + error, origin);
});

*/
client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});


/// prefix
const config = require("./bot.json");

fs.readdirSync("./PrefixCommands/").forEach((local) => {
  const comandos = fs
    .readdirSync(`./PrefixCommands/${local}`)
    .filter((arquivo) => arquivo.endsWith(".js"));

  for (let file of comandos) {
    let puxar = require(`./PrefixCommands/${local}/${file}`);

    if (puxar.name) {
      client.commands.set(puxar.name, puxar);
    }
    if (puxar.aliases && Array.isArray(puxar.aliases))
      puxar.aliases.forEach((x) => client.aliases.set(x, puxar.name));
  }
})

client.on(Events.MessageCreate, async (message) => {
  let prefix = config.prefix;

  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  let cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  try {
    command.run(client, message, args);
  } catch (err) { }
});

//// ticket
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "ticket") {
      const verificar = interaction.guild.channels.cache.find((g) => g.topic === interaction.user.id);

      if (verificar) {

        const embed = new EmbedBuilder()
          .setColor(bot.config.cor)
          .setDescription(`${interaction.user} Você já tem um ticket aberto no canal: ${verificar}`)

        const atalho = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificar.url)
        )

        // 1012171286635614230 cargo de acesso 

        interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true });
      } else {
        interaction.guild.channels.create({
          name: `ticket-${interaction.user.username}`,
          topic: `${interaction.user.id}`,
          parent: `1076307485851390012`,
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
              id: `1012171286635614230`,
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            }
          ],
        }).then(async (verificado) => {

          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Seu ticket foi criado com sucesso no canal: ${verificado}`)

          const embed2 = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setTitle("Suporte via Ticket")
            .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
            .addFields(
              {
                name: '<:hifen:1016130114074988655> \`Info User\`',
                value: `> Usuário: \`${interaction.user.username}\`\n> ID: \`(${interaction.user.id})\``,
                inline: false,
              },
              {
                name: '<:hifen:1016130114074988655> \`Info Ticket\`',
                value: `> Data: <t:${~~(interaction.createdAt / 1000)}:f>\n> Tempo decorrido: (<t:${~~(interaction.createdAt / 1000)}:R>)`,
                inline: false,
              },
            )
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1083837638211022958/suporte_AZ_png.png')
            .setFooter({ text: '©Animes Zero™ - Todos os Direitos Reservados.' })



          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificado.url)
          )

          //let equipeTicket = '1012536412035358770'

          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("assumir").setLabel("Assumir Ticket").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("sair").setLabel("Sair do ticket").setStyle(ButtonStyle.Primary),
          )

          await verificado.send({ content: `${interaction.user}  `, embeds: [embed2], components: [buttons] }).then(m => {
            m.pin();
          })

          interaction.reply({ embeds: [embed], components: [atalho], ephemeral: true })

        });
      }
    }
    //  ||<@&${equipeTicket}>||
    if (interaction.isButton()) {
      if (interaction.customId === "painel") {
        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} escolha algumas das opções abaixo.\n\n**Notificar:** Use caso o usuário demorar algum tempo pra responder.\n**Deletar:** Deleta o ticket.\n**Fechar Ticket:** Fecha o ticket mas não deleta.\n**Salvar Mensagens:** Salva os Logs do atendimento.`)

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

        const embed = new EmbedBuilder()
          .setColor(bot.config.cor)
          .setDescription({ content: `${user}, Olá tem alguém ai?\nUm staff respondeu o seu ticket!` })

        const atalho = new ActionRowBuilder().addComponents(
          new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(interaction.channel.url)
        )

        user.send({ embeds: [embed], components: [atalho] }).catch((err) => {
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
            .setColor(bot.config.cor)
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
            .setColor(bot.config.cor)
            .setDescription(`${user} Saiu do ticket`)

          interaction.channel.send({ embeds: [embed] });
        }
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === "fechar2") {
        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão, somente membros da equipe staff`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Confirme suas ações.\n\n**Deletar:** Deleta o ticket.\n**Salvar Mensagens:** Use caso queira salvar os logs do ticket.\n**Reabrir:** Use para reabrir e o usuário mandar mensagem novamente.`)

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

        const embed = new EmbedBuilder()
          .setColor(bot.config.cor)
          .setDescription(`Este canal será deletado em \` 20 Segundos \`.`)

        interaction.channel.send({ embeds: [embed] }).then(() => {
          setTimeout(() => {
            interaction.channel.delete();
          }, 20000)

        });

        const user = client.users.cache.get(interaction.channel.topic);
        const canal = interaction.channel;

        const transcript = await discordTranscripts.createTranscript(canal, {
          filename: `${interaction.user.username}-${interaction.user.id}.html`,
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
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão, somente membros da equipe staff`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const embed2 = new EmbedBuilder()
            .setColor(bot.config.cor)
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
        .setColor(bot.config.cor)
        .setDescription(`${user} Um staff reabriu o seu ticket`)

      const embed2 = new EmbedBuilder()
        .setColor(bot.config.cor)
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
      if (interaction.customId === "assumir") {

        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão, somente membros da equipe staff`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          await interaction.deferUpdate();

          const user = client.users.cache.get(interaction.channel.topic);

          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Um staff assumiu o seu ticket`)

          user.send({ embeds: [embed] }).catch((err) => {
            console.log(`${user.username}(${user.id}) está com sua fechada`);
          });

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(bot.config.cor)
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
                .addFields(
                  {
                    name: '<:hifen:1016130114074988655> \`Info User\`',
                    value: `> Usuário: \`${interaction.user.username}\`\n> ID:\`(${interaction.user.id})\``,
                    inline: false,
                  },
                  {
                    name: '<:hifen:1016130114074988655> \`Info Ticket\`',
                    value: `> Data: <t:${~~(interaction.createdAt / 1000)}:f>\n> Tempo decorrido: (<t:${~~(interaction.createdAt / 1000)}:R>)\n> Assumido por: ${interaction.user}`,
                    inline: false,
                  },
                )
                .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1083837638211022958/suporte_AZ_png.png')
                .setFooter({ text: '©Animes Zero™ - Todos os Direitos Reservados.' })
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

const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://vinissu01:C9KHnytPFF4iJJWV@naomibot.c5saksh.mongodb.net/?retryWrites=true&w=majority");

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const randomXp = Math.floor(Math.random() * 98) + 1;
  const level = await Levels.appendXp(
    message.author.id,
    message.guild.id,
    randomXp
  );
})