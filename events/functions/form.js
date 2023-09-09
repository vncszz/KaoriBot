const Discord = require("discord.js");
const config = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "staff" });

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {


        const database = await db.get(interaction.message.id);
        if (!database) return;

        const member = interaction.guild.members.cache.get(interaction.user.id);
        if (!member) return;


        if (interaction.isButton() && interaction.customId === "aceitar_button") {
            if (!interaction.member.roles.cache.get(config.perms.equipe_formulario))
                return interaction.reply({
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setColor("#A71616")
                            .setDescription(
                                `❌ Você não tem permissão para aprovar formulários!`
                            ),
                    ],
                    ephemeral: true,
                });


            const membro = await interaction.guild.members.cache.get(database.usuario);
            if (!membro) return;

            const role = interaction.guild.roles.cache.find((r) => r.id === config.cargo_aprovado);
            membro.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#48D6AD")
                        .setImage("https://media.discordapp.net/attachments/1121941833451323412/1150054384399560734/286_Sem_Titulo_20230907222617.png?width=1025&height=323")
                        .setDescription(`🎉 Parabéns ${membro}, você foi **aprovado** em nosso formulário staff!\n\nvenha ao canal <#1128295293746683935> e um supervisor irá te auxiliar!`)
                ]
            })

            membro.roles.add(role)
                .then(() => console.log(`Adicionado cargo para ${membro}`))
                .catch(console.error);

            interaction.update({
                content: `${membro} foi aprovado por ${interaction.user}`,
                components: []
            });

        };

        if (interaction.isButton() && interaction.customId === "negar_button") {
            const membro = await interaction.guild.members.cache.get(database.usuario);
            if (!membro) return;

            membro.send({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#A71616")
                        .setImage("https://media.discordapp.net/attachments/1121941833451323412/1150054384399560734/286_Sem_Titulo_20230907222617.png?width=1025&height=323")
                        .setDescription(`Olá ${membro}, você foi **reprovado** em nosso formulario staff!\n\n**Possíveis causas:**\n<:dotvermelho_az:1129537166188490753> Nick Indevido \n<:dotvermelho_az:1129537166188490753> Pouco tempo\n<:dotvermelho_az:1129537166188490753> Motivo Errado\n<:dotvermelho_az:1129537166188490753> Mal Comportamento no servidor\n<:dotvermelho_az:1129537166188490753> Idade muito baixa\n<:dotvermelho_az:1129537166188490753> Alguma Resposta errada e entre outros fatores!`)
                ]
            })

            interaction.update({
                content: `${membro} foi reprovado por ${interaction.user}`,
                components: []
            });
        };
    }
};