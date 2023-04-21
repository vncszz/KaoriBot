const { SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} = require("discord.js");
const bot = require("../../bot.json");

/*
<:1_white:1097560483285962752> 
<:2_white:1097560518992068628> 
<:3_white:1097560553104355390> 
<:4_white:1097560590207172789>
<:5_white:1097560626395611216>
<:6_white:1097560970559246488>
<:7_white:1097561031271792660>
<:8_white:1097561062305431612>
<:9_white:1097561106144309278>
*/

/*icon dos cargos
<:divineblessing:1055200164840742995>
<:eagleglasses:1055199968710897724>
<:flamesphere:1076630239830081609>
*/

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vip-rank")
        .setDescription("Veja a lista dos vips do servidor."),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction  
     */
    async execute(interaction) {

        const { user } = interaction;

        if (!interaction.member.permissions.has(bot.config.ownerId)) {
            interaction.reply({ content: 'Esse comando está disponível apenas para meu desenvolvedor!', ephemeral: true })
        } else {

            const embed = new EmbedBuilder()
                .setColor("DarkPurple")
                .setTitle("🏆 | Vip Rank")
                .setDescription(`
                    Veja a lista de vips do servidor.

                    <:vip_divine:1098943179409080332> **Divine Blessing**
                    <:vip_eagle:1098943227144450129> **Eagle Glasses**
                    <:flamesphere:1076630239830081609> **Flaming Sphere**

                `)
                .setTimestamp()
                .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL() })
                .addFields({ name: `<:pix:1097561994644705341> **Onde comprar?**`, value: `<#1076319647890149496>` })

            const painelVip = new StringSelectMenuBuilder()
                .setCustomId('painelInicio')
                .setPlaceholder('👋 Clique Aqui')
                .addOptions(
                    new StringSelectMenuOptionBuilder()
                        .setEmoji('🏠')
                        .setLabel('Pagina Inicial')
                        .setDescription('Pagina Inicial')
                        .setValue('Home'),

                    new StringSelectMenuOptionBuilder()
                        .setLabel('Divine Blessing')
                        .setEmoji('<:vip_divine:1098943179409080332>')
                        .setDescription('Veja a lista de usuários Divine Blessing')
                        .setValue('DivineBlessing'),

                    new StringSelectMenuOptionBuilder()
                        .setLabel('Eagle Glasses')
                        .setEmoji('<:vip_eagle:1098943227144450129>')
                        .setDescription('Veja a lista de usuários Eagle Glass')
                        .setValue('EagleGlasses'),

                    new StringSelectMenuOptionBuilder()
                        .setEmoji('<:flamesphere:1076630239830081609>')
                        .setLabel('Flaming Sphere')
                        .setDescription('Veja a lista de usuários Flaming Sphere')
                        .setValue('FlamingSphere'),
                );

            const row = new ActionRowBuilder()
                .addComponents(painelVip);

            await interaction.reply({
                embeds: [embed],
                components: [row],

            }).then(msg => {

                const filtro = (interaction) =>
                    interaction.isSelectMenu()

                const coletor = msg.createMessageComponentCollector({
                    //time: 60000,
                    filtro
                });

                coletor.on('collect', async (collected) => {

                    let valor = collected.values[0]
                    collected.deferUpdate()

                    if (valor === 'Home') {

                        msg.edit({ embeds: [embed], components: [row] });

                    };

                    if (valor === 'DivineBlessing') {

                        let embed_2 = new EmbedBuilder()
                            .setColor('#317BD8')
                            .setTitle("Vips Divine Blessing")
                            .setFooter({ text: `Pedido por: ${interaction.user.tag}` })
                            .setTimestamp()
                            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                            .setDescription(`
                        <:1_white:1097560483285962752> <@942200106961235988>
                        <:2_white:1097560518992068628> <@934943736469798962>
                        `);

                        msg.edit({ embeds: [embed_2], components: [row] });
                    }

                    if (valor === 'EagleGlasses') {

                        let embed_3 = new EmbedBuilder()
                            .setColor('#E6F622')
                            .setTitle("Vips Eagle Glasses")
                            .setFooter({ text: `Pedido por: ${interaction.user.tag}` })
                            .setTimestamp()
                            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                            .setDescription(`
                                        <:1_white:1097560483285962752> **NINGUÉM**
                                        <:2_white:1097560518992068628> **NINGUÉM**
                                        <:3_white:1097560553104355390> **NINGUÉM**
                                        <:4_white:1097560590207172789> **NINGUÉM**
                                        <:5_white:1097560626395611216> **NINGUÉM**
                                        <:6_white:1097560970559246488> **NINGUÉM**
                                        <:7_white:1097561031271792660> **NINGUÉM**
                                        <:8_white:1097561062305431612> **NINGUÉM**
                                        <:9_white:1097561106144309278> **NINGUÉM**
                        `);

                        msg.edit({ embeds: [embed_3], components: [row] });
                    }

                    if (valor === 'FlamingSphere') {

                        let embed_4 = new EmbedBuilder()
                            .setColor('#DC1E1E')
                            .setTitle("Vips Flaming Sphere")
                            .setFooter({ text: `Pedido por: ${interaction.user.tag}` })
                            .setTimestamp()
                            .setThumbnail(`${interaction.guild.iconURL({ dynamic: true })}`)
                            .setDescription(`
                        <:1_white:1097560483285962752> <@996379521345400923>
                        <:2_white:1097560518992068628> <@632040511036850187>
                        <:3_white:1097560553104355390> <@528261603112517642>
                        `);

                        msg.edit({ embeds: [embed_4], components: [row] });
                    }
                })
            })

        }

    }
}