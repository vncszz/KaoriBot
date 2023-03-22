const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Veja as informações de usuário.")
    .addUserOption((user) => user .setName("user").setDescription("Escolhar o usuário").setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

      const {options,guild} = interaction;
      const user = options.getUser("user") || interaction.user;
      const user2 = guild.members.cache.get(user.id);

      const perms = {
            CreateInstantInvite: '\`Criar convite instantâneo\`',
            KickMembers: '\`Expulsar membros\`',
            BanMembers: '\`Banir membros\`',
            Administrator: '\`Administrador\`',
            ManageChannels: '\`Gerenciar canais\`',
            ManageGuild: '\`Gerenciar servidor\`',
            AddReactions: '\`Adicionar reações\`',
            ViewAuditLog: '\`Ver registro de auditoria\`',
            PrioritySpeaker: '\`Voz Prioritária\`',
            Stream: '\`Ao vivo\`',
            ViewChannel: '\`Ver canais\`',
            SendMessages: '\`Enviar mensagens\`',
            SendTTSMessages: '\`Enviar mensagens em tts\`',
            ManageMessages: '\`Gerenciar mensagens\`',
            EmbedLinks: '\`Enviar links\`',
            AttachFiles: '\`Enviar anexos\`',
            ReadMessageHistory: '\`Ver histórico de mensagens\`',
            MentionEveryone: '\`Mencionar everyone e cargos\`',
            UseExternalEmojis: '\`Usar emojis externos\`',
            UseExternalStickers: '\`Usar figurinhas externas\`',
            ViewGuildInsights: '\`Ver análises do servidor\`',
            Connect: "\`Conectar em call's\`",
            Speak: `\`Falar em call's\``,
            MuteMembers: `\`Mutar membros\``,
            DeafenMembers: `\`Ensurdecer membros\``,
            MoveMembers: `\`Mover membros\``,
            UseVAD: `\`Utilizar detecção de voz\``,
            ChangeNickname: `\`Alterar apelido\``,
            ManageNicknames: `\`Gerenciar apelidos\``,
            ManageRoles: `\`Gerenciar cargos\``,
            ManageWebhooks: `\`Gerenciar webhooks\``,
            ManageEmojisAndStickers: `\`Gerenciar emojis e figurinhas\``,
            UseApplicationCommands: `\`Utilizar comandos slashs (/)\``,
            RequestToSpeak: `\`Pedir para falar\``,
            ManageEvents: `\`Gerenciar eventos\``,
            ManageThreads: `\`Gerenciar threads\``,
            CreatePublicThreads: `\`Criar threads públicas\``,
            CreatePrivateThreads: `\`Criar threads privadas\``,
            SendMessagesInThreads: `\`Falar em threads\``,
            UseEmbeddedActivities: `\`Iniciar atividades\``,
            ModerateMembers: `\`Gerenciar moderação do servidor\``
        }

      const embed = new Discord.EmbedBuilder()
      .setColor('White')
      .setFields(
            { name: `🆔 ID do Discord`, value: `\`${user.id}\``, inline: true },
            { name: `🏷️ Tag do Discord`, value: `\`${user.tag}\``, inline: true },
            { name: `📅 Data de Criação da Conta`, value: `<t:${~~(user.createdTimestamp / 1000)}:f> (<t:${~~(user.createdTimestamp / 1000)}:R>)`, inline: true },
      )
      .setThumbnail(user.avatarURL({dynamic: true}))
      .setTitle("Informações sobre o Usuário")
      .setURL(`https://discord.com/users/${user.id}`)

      const embed2 = new Discord.EmbedBuilder()
      .setColor('White')
      .setTitle("Informações sobre o Membro")
      .setFields(
            { name: `📅 Data de Entrada no Servidor`, value: `<t:${~~(user2.joinedTimestamp / 1000)}:f> (<t:${~~(user2.joinedTimestamp / 1000)}:R>)`, inline: true },
            { name: `💼 Maior cargo`, value: `${user2.roles.cache.sort((a, b) => b.position - a.position).first()}`, inline: true },
      )

      const buttons = new Discord.ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId(`${user.id}`).setLabel("Ver o avatar grobal do usuário").setStyle(ButtonStyle.Primary),
            new ButtonBuilder().setCustomId("permission").setLabel("Permissões do membro").setStyle(ButtonStyle.Primary),
      )

      interaction.reply({ embeds: [embed,embed2], components: [buttons] }).then(() => {
            const colector = interaction.channel.createMessageComponentCollector({})
            
            colector.on("collect", async (interaction) => {
                  if (interaction.customId === `${user.id}`) {
                        
                        if (interaction.user.id !== user.id) {
                              const avatar = user.avatarURL({ dynamic: true, size: 2048 });

                              const embed3 = new EmbedBuilder()
                              .setColor('White')
                              .setTitle(`🖼 ${user.username}`)
                              .setImage(avatar)
                  
                              const button2 = new ActionRowBuilder().addComponents(
                                    new ButtonBuilder().setLabel("Abrir avatar no navegador").setStyle(ButtonStyle.Link).setURL(avatar),
                              )
                              interaction.reply({ embeds: [embed3], components: [button2], ephemeral: true });
                        }
                  } else if (interaction.customId === "permission") {
                        const permsArray = user2.permissions.toArray().map(p => perms[p])
                        const cargosArray = user2.roles.cache.map((p) => `${p}`)

                        const embedPerms = new Discord.EmbedBuilder().setColor('White').addFields(
                          {
                            name: '💼 Cargos',
                            value: `${cargosArray}`,
                            inline: false
                          },
                          {
                            name: `⚙️ Permissões`,
                            value: `${permsArray.join(', ')}`
                          }
                        )
                
                        await interaction.reply({ embeds: [embedPerms], ephemeral: true})
                  }
            })
      })
    },
};