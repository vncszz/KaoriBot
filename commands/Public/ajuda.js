const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const Discord = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ajuda")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDescription("Veja meus comandos."),

    async execute(interaction) {

        const { client } = interaction;

        let embed_painel = new Discord.EmbedBuilder()
            .setThumbnail(interaction.guild.iconURL()) //Sua tumb
            .setTitle('<:slashcommands:1113565261975523401> Meus comandos')
            .setDescription(`Algumas coisas básicas que você deve saber!
            
Leia mais sobre as funcionalidades selecionando uma opção abaixo.`)
            .setColor(`Red`)

        //embed_utilidade

        let embed_utilidade = new Discord.EmbedBuilder()
            .setDescription("Este aqui são os meus comandos de info")
            .setColor("Red")
            .addFields(
                { name: "<:slashcommands:1113565261975523401>│ </ping:1097243862369566760>", value: "<:regrasaz:1104006684994719744>│ **Veja o ping do bot**", inline: true },

            )

        //embed_diversao

        /*let embed_diversao = new Discord.EmbedBuilder()
            .setDescription("Este aqui são os meus comandos de diversão")
            .setColor("Red")
            .addFields(
                { name: "<:slashcommands:1113565261975523401>│ </:>", value: "<:regrasaz:1104006684994719744>│ **Descrição do comando**", inline: true },
            )
        */
        //embed_adm

        let embed_adm = new Discord.EmbedBuilder()
            .setDescription("Este aqui são os meus comandos de administração")
            .setColor("Red")
            .addFields(
                { name: "<:slashcommands:1113565261975523401>│ </welcome-setup:1093318669339205654>", value: "<:regrasaz:1104006684994719744>│ **Defina o canal da mensagem de boas vindas**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </clear-channel:1099466214557892769>", value: "<:regrasaz:1104006684994719744>│ **Limpe todas as mensagens de um canal**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </clear:1093318669062389918>", value: "<:regrasaz:1104006684994719744>│ **Limpe as mensagens de um canal ou usuário**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </role-all:1110574355567607808>", value: "<:regrasaz:1104006684994719744>│ **Dê um cargo específico a todos os usuários do servidor**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </setup-antiscam:1110563013951500349>", value: "<:regrasaz:1104006684994719744>│ **Ligue Desligue o anti-scam no servidor**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </ticket-delete:1103352521226977430>", value: "<:regrasaz:1104006684994719744>│ **Apague um ticket sem precisar subir e ir no painel**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </ticket:1093318669339205655>", value: "<:regrasaz:1104006684994719744>│ **Seta o painel de ticket no canal de suporte**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </verify setup:1110531773823189124>", value: "<:regrasaz:1104006684994719744>│ **Seta o sistema de verificar usuário**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </verify disable:1110531773823189124>", value: "<:regrasaz:1104006684994719744>│ **Desativa o sistema de verificar usuário**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </parceria:1093318669339205652>", value: "<:regrasaz:1104006684994719744>│ **Faça uma parceria através do bot**", inline: true },
                { name: "<:slashcommands:1113565261975523401>│ </ver-parcerias:1111620673358528512>", value: "<:regrasaz:1104006684994719744>│ **Ver quantas parcerias o promotor já tem**", inline: true },

            )

        //embed_economia

        /*let embed_economia = new Discord.EmbedBuilder()
            .setDescription("Este aqui são os meus comandos de info")
            .setColor("Red")
            .addFields(
                { name: "<:slashcommands:1113565261975523401>│ </:>", value: "<:regrasaz:1104006684994719744>│ ** Descrição do comando**", inline: true },

            )
        */

        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.SelectMenuBuilder()
                .setCustomId("painel_help")
                .setPlaceholder("👋 Clique aqui!")
                .addOptions(
                    {
                        label: "Painel Inicial",
                        emoji: "<:home_badge:1113565473171329169>",
                        value: "painel"
                    },
                    {
                        label: "Utilidade",
                        description: "Veja meus comandos de utilidade.",
                        emoji: "<:chave_badge:1113573482832330853>",
                        value: "utilidade"
                    },
                    /*{
                        label: "Diversão",
                        description: "Veja meus comandos de diversão.",
                        emoji: "<:icons_bright:1104145437901983917>",
                        value: "diversao"
                    },*/
                    {
                        label: "Administração",
                        description: "Veja meus comandos de administração.",
                        emoji: "<:staff_badge:1113565398168764516>",
                        value: "adm"
                    },
                    /* {
                         label: "Economia",
                         description: "Veja meus comandos de administração.",
                         emoji: "<:icon:1104148381380653177>",
                         value: "economia"
                     }*/
                )
        )

        interaction.reply({ embeds: [embed_painel], components: [painel], ephemeral: true }).then(() => {
            interaction.channel.createMessageComponentCollector().on("collect", (c) => {
                let valor = c.values[0];

                if (valor === "painel") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_painel] })
                } else if (valor === "utilidade") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_utilidade] })
                } else if (valor === "adm") {
                    c.deferUpdate()
                    interaction.editReply({ embeds: [embed_adm] })
                }

            })
        })



    }
}