const { Partials, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
const Discord = require("discord.js")
require('dotenv').config();


const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildInvites
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


const { loadEvents } = require("./handlers/handlerEvent");
const { loadCommands } = require("./handlers/handlerCommand");
const { loadModals } = require('./events/functions/modalCreate');


client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.modals = new Discord.Collection();
loadModals(client);


//database connect
const connectiondb = require("./database/connect")
connectiondb.start();


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
client.on("interactionCreate", async (interaction) => {
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

/////// interaction ticket
const discordTranscripts = require('discord-html-transcripts');

client.on("interactionCreate", async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "abrir_ticket") {

      let verificar = interaction.guild.channels.cache.find((canal) => canal.topic === interaction.user.id);

      if (verificar) {

        await interaction.reply({ content: `${interaction.user}, Você já possui um ticket em: ${verificar}`, ephemeral: true });

      } else {

        interaction.guild.channels.create({
          name: `Ticket-${interaction.user.username}`,
          topic: `${interaction.user.id}`,
          parent: "1076307485851390012",
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
              id: "1012171286635614230",
              allow: ["ViewChannel", "SendMessages", "AttachFiles", "EmbedLinks", "AddReactions"]
            },
          ],
        }).then(async (verificado) => {

          let equipeTicket = '1012536412035358770'

          const embed = new Discord.EmbedBuilder()
            .setColor('White')
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

          const button = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("fechar_ticket").setEmoji("🔒").setLabel("Fechar Ticket").setStyle(ButtonStyle.Danger),
            new ButtonBuilder().setCustomId("sair_ticket").setEmoji("🚪").setLabel("Sair do Ticket").setStyle(ButtonStyle.Secondary)
          );

          await interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em: ${verificado}`, ephemeral: true });
          verificado.send({ content: `${interaction.user} <@&${equipeTicket}>`, embeds: [embed], components: [button] }).then(m => {
            m.pin();
          })
        });
      };
    } if (interaction.isButton()) {
      if (interaction.customId.startsWith('fechar_ticket')) {
        if (!interaction.member.roles.cache.has('1012536412035358770'))
          interaction.reply({ content: `<:warn:1088075139805085856> Somente **Staffs** possui essa permissão.`, ephemeral: true })
        else {
          const user = client.users.cache.get(interaction.channel.topic);

          const embed = new Discord.EmbedBuilder()
            .setColor('DarkGreen')
            .setFields(
              { name: "Ticket Aberto Por:", value: `\`${user.tag}\``, inline: true },
              { name: "Ticket Fechado Por:", value: `\`${interaction.user.username}\``, inline: false },
              { name: "Ticket:", value: `\`${interaction.channel.name}\``, inline: false },
              { name: "Data:", value: `\`${new Date().toLocaleDateString()} / ${new Date().toLocaleTimeString()}\``, inline: true },
              { name: "Download:", value: `Clique no arquivo acima.`, inline: false },
            )

          const canal = interaction.channel;
          const attachment = await discordTranscripts.createTranscript(canal, {
            filename: `${interaction.user.username}-${interaction.user.id}.html`
          });

          interaction.guild.channels.cache.get("1087511879104090122").send({
            embeds: [embed],
            files: [attachment],
          });

          await interaction.channel.delete();
        }
      }
      else if (interaction.customId === "sair_ticket") {
        const user = client.users.cache.get(interaction.channel.topic);

        if (user.id !== interaction.user.id) {
          interaction.reply({ content: "você não pode sair de um ticket que não é seu.", ephemeral: true })
        } else {
          interaction.channel.permissionOverwrites.edit(user.id, {
            ViewChannel: false, SendMessages: false, AttachFiles: false, EmbedLinks: false, AddReactions: false
          })

          interaction.reply({ content: `${user} saiu do ticket!` })
        }

      }
    }
  }
})

//// afk interaction
const { Events } = require("discord.js");
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