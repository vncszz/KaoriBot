///////// TIKCKET 
const Discord = require("discord.js");
const discordTranscripts = require("discord-html-transcripts");
const config = require("../../config.json");
const client = require("../../index")

module.exports = {
    name: "interactionCreate",
    
    async execute(interaction) {
        if (interaction.isStringSelectMenu()) {
            if (interaction.customId === "painel_ticket") {
                let opc = interaction.values[0]
    
                if (opc === "opc_denuncia") {
    
                    let nome = `📢﹕denúncia﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
    
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true })
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**\nEnvie o Id dos denunciados juntamente das provas.`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `\`Denúncia\``,
                                        inline: false
                                    }
    
                                )
                                .setImage('https://cdn.discordapp.com/attachments/1076242922971869214/1103358017455538277/Screenshot_1.png')
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
    
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            );
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            });
                        });
                    };
    
                } else if (opc === "opc_parceria") {
    
                    let nome = `🤝﹕parceria﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "988493069731102760", /// Equipe_Parceria
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `\`Parceria\``,
                                        inline: false
                                    }
    
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                                new Discord.ButtonBuilder().setCustomId("claim_ticket").setLabel("Claim").setStyle(Discord.ButtonStyle.Primary).setEmoji("👋"),
    
                            )
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
    
                } else if (opc === "opc_comprarVip") {
    
                    let nome = `🎉﹕comprar﹒vip﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `\`Comprar Vip\``,
                                        inline: false
                                    },
                                    {
                                        name: `Formas de Pagamento:`,
                                        value: `</pix:1138594156156043394>\n${config.emojis.reply} \`Gere um qr code para pagamento.\` (Apenas Administrador)`,
                                        inline: false
                                    },
                                    {
                                        name: `Botão Pix:`,
                                        value: `${config.emojis.reply} O Bot enviará uma chave de pagamento em sua dm.`,
                                        inline: false
                                    },
    
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                                new Discord.ButtonBuilder().setCustomId("botao_pix").setLabel("Pix").setStyle(Discord.ButtonStyle.Success).setEmoji("<:pix:1097561994644705341>")
                            );
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
    
                } else if (opc === "opc_sugestoes") {
    
                    let nome = `🙋﹕sugestão﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `\`Sugestão\``,
                                        inline: false
                                    }
    
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            )
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
    
                } else if (opc === "opc_patrocinio_sonhos") {
    
                    let nome = `💸﹕patrocinio﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770",// Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `\`Patrocinio por sonhos\``,
                                        inline: false
                                    }
    
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            )
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
    
                } else if (opc === "opc_ajuda_duvida") {
    
                    let nome = `❓﹕dúvida﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `${config.emojis.reply} \`Dúvida/ajuda\``,
                                        inline: false
                                    }
    
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            )
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
                } else if (opc === 'opc_patrocinio_dinheiro') {
                    let nome = `💸﹕patrocinio﹒${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `${config.emojis.reply} \`Patrocinio por R$\``,
                                        inline: false
                                    },
                                    {
                                        name: `Formas de Pagamento:`,
                                        value: `</pix:1138594156156043394>\n${config.emojis.reply} \`Gere um qr code para pagamento.\` (Apenas Administrador)`,
                                        inline: false
                                    },
                                    {
                                        name: `Botão Pix:`,
                                        value: `${config.emojis.reply} \`O Bot enviará uma chave de pagamento em sua dm.\``,
                                        inline: false
                                    },
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                                new Discord.ButtonBuilder().setCustomId("botao_pix").setLabel("Pix").setStyle(Discord.ButtonStyle.Success).setEmoji("<:pix:1097561994644705341>")
                            );
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
                } else if (opc === "opc_desbugar_selecao") {
                    await interaction.reply({ content: `Seleção desbugada com sucesso! Hihi 😜`, ephemeral: true })
                } else if (opc === 'claimar_premio') {
                    let nome = `🎁﹕claim﹒prêmio-${interaction.user.tag}`;
                    let categoria = "1103832124689240084"
    
                    if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                    if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                        interaction.reply({ content: `Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: true })
                    } else {
                        interaction.guild.channels.create({
                            name: nome,
                            topic: `${interaction.user.id}`,
                            type: Discord.ChannelType.GuildText,
                            parent: categoria,
                            permissionOverwrites: [
                                {
                                    id: interaction.guild.id,
                                    deny: [
                                        Discord.PermissionFlagsBits.ViewChannel
                                    ]
                                },
                                {
                                    id: "1012536412035358770", // Equipe_Ticket
                                    allow: [
                                        Discord.PermissionFlagsBits.ManageChannels,
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                },
                                {
                                    id: interaction.user.id,
                                    allow: [
                                        Discord.PermissionFlagsBits.ViewChannel,
                                        Discord.PermissionFlagsBits.SendMessages,
                                        Discord.PermissionFlagsBits.AttachFiles,
                                        Discord.PermissionFlagsBits.EmbedLinks,
                                        Discord.PermissionFlagsBits.AddReactions
                                    ]
                                }
                            ]
                        }).then((ch) => {
                            interaction.reply({ content: `${interaction.user}, seu ticket foi aberto em ${ch}`, ephemeral: true });
    
                            let embed = new Discord.EmbedBuilder()
                                .setColor(config.color.rosa)
                                .setTitle(`Ticket de ${interaction.user.username}`)
                                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                                .setDescription(`Seja bem vindo(a) ao seu **Ticket.**`)
                                .addFields(
                                    {
                                        name: '**__INFORMAÇÕES__**',
                                        value: `${config.emojis.member} Usuário: ${interaction.user.username}\n${config.emojis.reply}ID: \`${interaction.user.id}\``,
                                        inline: true,
                                    },
                                    {
                                        name: `Motivo:`,
                                        value: `${config.emojis.reply}\`Claimar Prêmio (sorteio)\``,
                                        inline: false
                                    },
                                )
                                .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                                .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
    
                            const button_staff = new Discord.ActionRowBuilder().addComponents(
                                new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            );
    
                            ch.send({ content: `${interaction.user}`, embeds: [embed], components: [button_staff] }).then(m => {
                                m.pin()
                            })
                        });
                    }
                };
    
            }
        };
    
        if (interaction.isButton()) {
            if (interaction.customId === "botao_pix") {
    
                const user = client.users.cache.get(interaction.channel.topic);
    
                let chaves = [
                    "31 995264911",
                    "d54ebb08-0363-4f01-8a6e-80609ef380de"
                ];
    
                const randomChaves = Math.floor(Math.random() * chaves.length);
                const chave_aleatoria = chaves[randomChaves];
    
                await user.send(`${chave_aleatoria}`).catch((err) => {
                    return interaction.reply(`**${user}, Certifique-se que sua Dm esteja aberta para que eu possa enviar a chave pix!**`)
                });
    
                await interaction.reply(`**${user}, Enviei uma chave pix em sua dm, faça o pagamento e envie o comprovante aqui!**`)
            };
        };
    
        if (interaction.isButton()) {
            if (interaction.customId === "painel") {
                if (!interaction.member.roles.cache.get("1012536412035358770")) {
                    return interaction.reply({ content: `você não tem permissão pra isto!`, ephemeral: true });
                } else {
                    const embed = new Discord.EmbedBuilder()
                        .setColor(config.color.preto)
                        .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                        .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                        .setDescription(`**Bem vindo ao painel staff ${interaction.user}**`)
                        .addFields(
                            { name: `${config.emojis.lixeira} Deletar ticket`, value: `${config.emojis.reply} \`Deleta o canal do ticket e salva os logs.\``, inline: false },
                            { name: `${config.emojis.cadeado} Trancar ticket`, value: `${config.emojis.reply} \`Tranque apenas o canal, retirando a permissão do membro ver o canal.\``, inline: false },
                            { name: `${config.emojis.cadeado} Reabrir ticket`, value: `${config.emojis.reply} \`Reabra o canal de ticket e permita o membro ver novamente o canal.\``, inline: false },
                            { name: `${config.emojis.member} Notificar membro`, value: `${config.emojis.reply} \`Notifique o membro do ticket.\``, inline: false },
                            { name: `${config.emojis.call} Call suporte`, value: `${config.emojis.reply} \`Crie um canal de suporte por voz.\``, inline: false },
                        )
    
                    const buttons = new Discord.ActionRowBuilder().addComponents(
                        new Discord.ButtonBuilder().setCustomId("deletar").setLabel("Deletar ticket").setStyle(Discord.ButtonStyle.Danger),
                        new Discord.ButtonBuilder().setCustomId("trancar").setLabel("Trancar ticket").setStyle(Discord.ButtonStyle.Primary),
                        new Discord.ButtonBuilder().setCustomId("reabrir").setLabel("Reabrir ticket").setStyle(Discord.ButtonStyle.Success),
                        new Discord.ButtonBuilder().setCustomId("notificar").setLabel("Notificar membro").setStyle(Discord.ButtonStyle.Primary).setDisabled(true),
                        new Discord.ButtonBuilder().setCustomId("criar_call").setLabel("Call suporte").setStyle(Discord.ButtonStyle.Primary).setDisabled(false),
                    );
    
                    interaction.reply({ embeds: [embed], components: [buttons], ephemeral: true });
                }
            };
        }
    
        if (interaction.isButton()) {
            if (interaction.customId === "criar_call") {
                const user = client.users.cache.get(interaction.channel.topic);
    
                let nome = `📛﹕Suporte-${user.tag}`;
                let categoria = "1103832124689240084"
    
    
                if (!interaction.guild.channels.cache.get(categoria)) categoria = null;
    
                if (interaction.guild.channels.cache.find(c => c.name === nome)) {
                    interaction.reply({ content: `Você já criou um canal de voz: ${interaction.guild.channels.cache.find(c => c.name === nome)}!`, ephemeral: false })
                } else {
                    interaction.guild.channels.create({
                        name: nome,
                        type: Discord.ChannelType.GuildVoice,
                        parent: categoria,
                        userLimit: 2,
                        permissionOverwrites: [
                            {
                                id: interaction.guild.id,
                                deny: [
                                    Discord.PermissionFlagsBits.ViewChannel
                                ]
                            },
                            {
                                id: "1012536412035358770", // Equipe_Ticket
                                allow: [
                                    Discord.PermissionFlagsBits.Speak,
                                    Discord.PermissionFlagsBits.PrioritySpeaker,
                                    Discord.PermissionFlagsBits.MoveMembers,
                                    Discord.PermissionFlagsBits.Connect,
                                    Discord.PermissionFlagsBits.MuteMembers,
                                    Discord.PermissionFlagsBits.Stream,
                                    Discord.PermissionFlagsBits.ManageChannels,
                                ]
                            },
                            {
                                id: user.id,
                                allow: [
                                    Discord.PermissionFlagsBits.ViewChannel,
                                    Discord.PermissionFlagsBits.Speak,
                                    Discord.PermissionFlagsBits.Connect,
                                    Discord.PermissionFlagsBits.Stream,
                                ]
                            }
                        ]
                    }).then((ch) => {
                        interaction.reply({ content: `Canal de voz criado: ${ch}`, ephemeral: false })
                    })
                }
            }
    
            if (interaction.isButton()) {
                if (interaction.customId === "botao_pix") {
    
                    const user = client.users.cache.get(interaction.channel.topic);
    
                    if (interaction.isButton()) {
                        if (interaction.customId === "botao_pix") {
    
                            const user = client.users.cache.get(interaction.channel.topic);
    
                            let chaves = [
                                "31 995264911",
                                "d54ebb08-0363-4f01-8a6e-80609ef380de"
                            ];
    
                            const chaves_aleatorias = Math.floor(Math.random() * chaves.length);
                            const chaves_pix = chaves[chaves_aleatorias];
    
                            await user.send(`${chaves_pix}`).catch((err) => {
                                return interaction.reply(`**${user}, Certifique-se que sua Dm esteja aberta para que eu possa enviar a chave pix!**`)
                            });
    
                            await interaction.reply(`**${user}, Enviei uma chave pix em sua dm, faça o pagamento e envie o comprovante aqui!**`)
    
                        }
                    }
    
                    await user.send(`${chave_aleatoria}`).catch((err) => {
                        return interaction.reply(`${interaction.user}, Abra sua Dm para que eu possa enviar a chave aleatória!`)
                    });
    
                    await interaction.reply(`${user}, Enviei uma chave pix em sua dm, faça o pagamento e envie o comprovante aqui!`)
    
                }
            }
    
            if (interaction.isButton()) {
                if (interaction.customId === "claim_ticket") {
    
                    const user = client.users.cache.get(interaction.channel.topic);
    
                    if (!interaction.member.roles.cache.get("1012536412035358770")) {
    
                        return interaction.reply({ content: `você não tem permissão pra isto!`, ephemeral: true });
                    } else {
                        await interaction.deferUpdate();
    
                        const buttons = new Discord.ActionRowBuilder().addComponents(
                            new Discord.ButtonBuilder().setCustomId("painel").setLabel("Painel Staff").setStyle(Discord.ButtonStyle.Secondary).setEmoji("<:staff_badge:1113565398168764516>"),
                            new Discord.ButtonBuilder().setCustomId("claim_ticket").setLabel("Atendido").setStyle(Discord.ButtonStyle.Primary).setEmoji("👋").setDisabled(true),
                        );
    
                        const embed = new Discord.EmbedBuilder()
                            .setColor('Random')
                            .setTitle(`Ticket de ${user.username}`)
                            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                            .setDescription(`Ticket Atendido`)
                            .setImage("https://cdn.discordapp.com/attachments/1128295293746683935/1131015163743567983/9f729750-799e-4cb4-90cf-057ec43c467f.png")
                            .setFooter({ text: `©${interaction.guild.name} - Todos os Direitos Reservados.`, URL: interaction.guild.iconURL({ dynamic: true }) })
                            .addFields(
                                {
                                    name: '**__INFORMAÇÕES__**',
                                    value: `${config.emojis.member} Usuário: ${user.username}\n${config.emojis.reply}ID: \`${user.id}\``,
                                    inline: true,
                                },
                                {
                                    name: `Motivo:`,
                                    value: `\`Fazer Parceria\``,
                                    inline: false
                                },
                                {
                                    name: '__Atendido Por:__',
                                    value: `<a:medalha_ouro:1102913825851850752> ${interaction.user}`,
                                    inline: false
                                }
                            )
                        await interaction.editReply({ embeds: [embed], components: [buttons] })
                        await interaction.channel.send(`**<a:y_sino:1130611058067898458> ${user} Seu ticket foi atendendido por ${interaction.user}!**`)
                    }
                }
    
                if (interaction.isButton()) {
                    if (interaction.customId === "deletar") {
                        await interaction.deferUpdate();
    
                        await interaction.channel.send({ content: '**<:trash:1124085610194403489> Este canal será deletado em 5 segundos...**' }).then(() => {
                            setTimeout(() => {
                                interaction.channel.delete();
    
                            }, 5000)
    
                        });
    
                        const user = client.users.cache.get(interaction.channel.topic);
                        const canal = interaction.channel;
    
                        const embed_log = new Discord.EmbedBuilder()
                            .setColor(config.color.preto)
                            .setTimestamp()
                            .addFields(
                                { name: `Aberto por:`, value: `${config.emojis.reply} ${user.tag}`, inline: false },
                                { name: `Fechado por:`, value: `${config.emojis.reply} ${interaction.user.tag}`, inline: true },
                                { name: `Data:`, value: `${config.emojis.reply} <t:${~~(interaction.createdAt / 1000)}:f>`, inline: false },
                                { name: `há:`, value: `${config.emojis.reply} (<t:${~~(interaction.createdAt / 1000)}:R>)`, inline: false },
                                { name: `Nome do canal:`, value: `${config.emojis.reply} \`${interaction.channel.name}\``, inline: false },
    
                            )
                        const transcript = await discordTranscripts.createTranscript(canal, {
                            filename: `ticket-${interaction.user.tag}.html`,
                        });
    
                        //ID DO CARGO DO CANAL DE LOGS
                        await interaction.guild.channels.cache.get("1087511879104090122").send({
                            embeds: [embed_log],
                            files: [transcript],
                        })
                    };
                }
    
                if (interaction.isButton()) {
                    if (interaction.customId === "trancar") {
                        //await interaction.deferUpdate();
    
                        const user = client.users.cache.get(interaction.channel.topic);
    
                        await interaction.deferReply(
    
                            interaction.channel.permissionOverwrites.edit(user.id, {
                                ViewChannel: false,
                                SendMessages: false,
                                AttachFiles: false,
                                EmbedLinks: false,
                                AddReactions: false
                            })
                        ).catch(() => { })
    
                        await interaction.followUp({ content: `**O ticket foi fechado** ${config.emojis.cadeado}` });
    
                    }
                }
    
                if (interaction.isButton()) {
                    if (interaction.customId === "reabrir") {
                        //await interaction.deferUpdate();
    
                        const user = client.users.cache.get(interaction.channel.topic);
    
                        await interaction.deferReply(
    
                            interaction.channel.permissionOverwrites.edit(user.id, {
                                ViewChannel: true,
                                SendMessages: true,
                                AttachFiles: true,
                                EmbedLinks: true,
                                AddReactions: true
                            })
                        ).catch(() => { })
                        interaction.followUp({ content: `**Ticket Reaberto ${config.emojis.certo}**`, ephemeral: false });
                    }
                }
            }
        }
    }
}