const { Partials, ActionRowBuilder, ButtonStyle, ButtonBuilder, EmbedBuilder } = require("discord.js");
const Discord = require("discord.js")
require('dotenv').config();
const fs = require("fs");
const config = require("./bot.json");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildInvites,
    Discord.GatewayIntentBits.GuildModeration
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


client.login(process.env.token).then(() => {
  loadEvents(client);
  loadCommands(client);
});


/// avatar interaction
client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === interaction.user.id) {
      const avatar = interaction.user.avatarURL({ dynamic: true, size: 2048 });

      const embed = new Discord.EmbedBuilder()
        .setColor('White')
        .setTitle(`🖼️ ${interaction.user.username}`)
        .setImage(avatar)
        .setFooter({ text: "Apesar de tudo, ainda é você." });

      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Abrir avatar no navegador")
          .setStyle(ButtonStyle.Link)
          .setURL(avatar)
      );

      interaction.reply({
        embeds: [embed],
        components: [button],
        ephemeral: true,
      });
    }
  }
});

///level
const Levels = require("discord-xp");
Levels.setURL("mongodb+srv://vinissu01:C9KHnytPFF4iJJWV@naomibot.c5saksh.mongodb.net/?retryWrites=true&w=majority"); //Colocar base de datos

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot || !message.guildId) return;
  const xp = Math.floor(Math.random() * 9) + 1;
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guildId, xp)
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guildId);
    message.channel.send(`Parabéns \`${message.author.username}\`,  Você avançou para o level **${user.level}** <:d_02yey:1065719606615998464>`)
  }
});


//// afk interaction
const afkSchema = require('./database/models/afkSchema');

client.on(Events.MessageCreate, async message => {
  if (message.author.bot) return;

  const check = await afkSchema.findOne({ Guild: message.guild.id, User: message.author.id });
  if (check) {
    const nick = check.Nickname;
    await afkSchema.deleteMany({ Guild: message.guild.id, User: message.author.id })

    await message.member.setNickname(`${nick}`).catch(err => {
      return;
    })

    const m1 = await message.reply({ content: `Bem vindo de volta, ${message.author}! I removi seu afk`, ephemeral: true });
    setTimeout(() => {
      m1.delete();
    }, 4000)
  } else {

    const members = message.mentions.users.first();
    if (!members) return;
    const Data = await afkSchema.findOne({ Guild: message.guild.id, User: members.id });
    if (!Data) return;

    const member = message.guild.members.cache.get(members.id);
    const msg = Data.Message || "nenhum motivo inserido";

    if (message.content.includes(members)) {
      const m = await message.reply({ content: `${member.user.tag} está em afk! - Motivo: ${msg}` });
      setTimeout(() => {
        m.delete();
        message.delete();
      }, 4000)
    }
  }
})


//// ticket
const bot = require("./bot.json");
const discordTranscripts = require('discord-html-transcripts');
const { QuickDB } = require("quick.db");
const db = new QuickDB();

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
                name: '\`Info User\`',
                value: `Usuário: \`${interaction.user.username}\`\nID: \`(${interaction.user.id})\``,
                inline: false,
              },
              {
                name: '\`Info Ticket\`',
                value: `Data: <t:${~~(interaction.createdAt / 1000)}:f>\nTempo decorrido: (<t:${~~(interaction.createdAt / 1000)}:R>)`,
                inline: false,
              },
            )
            .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1083837638211022958/suporte_AZ_png.png')
            .setFooter({ text: '©Animes Zero™ - Todos os Direitos Reservados.' })



          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(verificado.url)
          )

          //let equipeTicket = '1012536412035358770' <@&${equipeTicket}>

          const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("assumir").setLabel("Assumir Ticket").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("sair").setLabel("Sair do ticket").setStyle(ButtonStyle.Primary),
          )

          await verificado.send({ content: `${interaction.user} `, embeds: [embed2], components: [buttons] }).then(m => {
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
            new ButtonBuilder().setCustomId("fechar").setLabel("Fechar ticket").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("reabrir").setLabel("Reabrir Ticket").setStyle(ButtonStyle.Success),
            new ButtonBuilder().setCustomId("salvar").setLabel("Salvar Mensagens").setStyle(ButtonStyle.Secondary),
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
          .setDescription(`${user} Um staff respondeu o seu ticket`)

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
            .setDescription(`${interaction.user} Você não pode sair desse ticket`)

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
            .setDescription(`${interaction.user} Você não possui permissão`)

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

        const user = client.users.cache.get(interaction.channel.topic);

        const embed = new EmbedBuilder()
          .setColor(bot.config.cor)
          .setDescription(`Este canal será deletado em \` 20 Segundos \`.`)

        interaction.channel.send({ embeds: [embed] }).then(() => {
          interaction.channel.setName(`ticket-${interaction.user.username}`);
          interaction.channel.setTopic(`${user.id}`);
          setTimeout(() => {
            interaction.channel.delete();
          }, 20000)
        });
      };
    };

    if (interaction.isButton()) {
      if (interaction.customId === "fechar") {

        const user = client.users.cache.get(interaction.channel.topic);

        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          const embed2 = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`O ticket foi fechado com sucesso!`)

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
      if (interaction.customId === "salvar") {
        await interaction.deferUpdate();

        const canal = interaction.channel;

        const transcript = await discordTranscripts.createTranscript(canal, {
          filename: `${interaction.user.username}-${interaction.user.id}.html`,
        });

        const embed = new EmbedBuilder()
          .setColor(bot.config.cor)
          .setFields(
            { name: `Ticket Aberto Por: `, value: `\`${user.username.tag}\``, inline: true },
            { name: `Ticket Salvo Por:`, value: `\`${interaction.user.tag}\``, inline: true },
            { name: `Data / Horário`, value: `\`${interaction.createdAt.toLocaleDateString()}, ${interaction.createdAt.toLocaleTimeString()}\``, inline: true },
          )

        interaction.guild.channels.cache.get("1087511879104090122").send({
          embeds: [embed],
          files: [transcript],
        });
      };
    }

    if (interaction.isButton()) {
      if (interaction.customId === "assumir") {

        if (!interaction.member.roles.cache.get("1012536412035358770")) {
          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Você não possui permissão`)

          interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
          await interaction.deferUpdate();

          const user = client.users.cache.get(interaction.channel.topic);

          const embed = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setDescription(`${interaction.user} Um staff assumiu o seu ticket`)

          await db.add(`ticket_assumidos_${interaction.user.id}`, 1)

          const embed2 = new EmbedBuilder()
            .setColor(bot.config.cor)
            .setTitle("Novo Ticket Assumido")
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFields(
              { name: `Responsável Do Ticket:`, value: `\`${interaction.user.tag}\``, inline: true },
              { name: `Total De Tickets Assumidos:`, value: `\`${await db.get(`ticket_assumidos_${interaction.user.id}`)}\``, inline: true },
              { name: `ID Do Resposável:`, value: `\`${interaction.user.id}\``, inline: true },
              { name: `Canal:`, value: `\`${interaction.channel.name}\``, inline: true },
              { name: `Data / Horário`, value: `\`${interaction.createdAt.toLocaleDateString()}, ${interaction.createdAt.toLocaleTimeString()}\``, inline: true },
              { name: `Registrado Em:`, value: `\`${interaction.guild.name}\``, inline: true },
            )

          const atalho = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Ir Para Ticket").setStyle(ButtonStyle.Link).setURL(interaction.channel.url)
          )

          interaction.guild.channels.cache.get("1087511879104090122").send({ embeds: [embed2] });
          user.send({ embeds: [embed], components: [atalho] }).catch((err) => {
            console.log(`${user.username}(${user.id}) está com sua fechada`);
          });

          interaction.editReply({
            embeds: [
              new EmbedBuilder()
                .setColor(bot.config.cor)
                .setThumbnail(`${user.username.displayAvatarURL({ dynamic: true })}`)
                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\ndeixe claro oque deseja com nossa staff para um melhor atendimento!`)
                .addFields(
                  {
                    name: '\`Info User\`',
                    value: `Usuário: \`${interaction.user.username}\`\nID: \`(${interaction.user.id})\``,
                    inline: false,
                  },
                  {
                    name: '\`Info Ticket\`',
                    value: `Data: <t:${~~(interaction.createdAt / 1000)}:f>\nTempo decorrido: (<t:${~~(interaction.createdAt / 1000)}:R>)\nAssumido por: ${interaction.user}`,
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