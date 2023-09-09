const Discord = require("discord.js");
const config = require("../../config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB({ table: "staff" });

module.exports = {
    name: "interactionCreate",
    async execute(interaction) {

        if (interaction.isButton() && interaction.customId === "formulario_staff") {
            const modal = new Discord.ModalBuilder()
                .setCustomId("modal_staff")
                .setTitle(`Formulario Staff`);

            const idade_e_nome = new Discord.TextInputBuilder()
                .setCustomId('idade_e_nome')
                .setLabel('Qual seu nome e sua idade?')
                .setPlaceholder('Escreva aqui.')
                .setStyle(Discord.TextInputStyle.Short)

            const sobre_voce = new Discord.TextInputBuilder()
                .setCustomId('sobre_voce')
                .setLabel('Já foi staff em outro servidor?')
                .setPlaceholder('Escreva aqui.')
                .setStyle(Discord.TextInputStyle.Paragraph)

            const motivo_admissao = new Discord.TextInputBuilder()
                .setCustomId('motivo_admissao')
                .setLabel('Por que deseja fazer parte da equipe?')
                .setPlaceholder('Escreva aqui.')
                .setStyle(Discord.TextInputStyle.Paragraph)

            const areas_staffs = new Discord.TextInputBuilder()
                .setCustomId('areas_staffs')
                .setLabel('Quais das áreas quer atuar?')
                .setPlaceholder('Escreva aqui.')
                .setStyle(Discord.TextInputStyle.Paragraph)

            const como_ajudaria = new Discord.TextInputBuilder()
                .setCustomId('como_ajudaria')
                .setLabel('Como ajudaria na sua área desejada?')
                .setPlaceholder('Escreva aqui.')
                .setStyle(Discord.TextInputStyle.Paragraph)

            modal.addComponents(
                new Discord.ActionRowBuilder().addComponents(idade_e_nome),
                new Discord.ActionRowBuilder().addComponents(sobre_voce),
                new Discord.ActionRowBuilder().addComponents(motivo_admissao),
                new Discord.ActionRowBuilder().addComponents(areas_staffs),
                new Discord.ActionRowBuilder().addComponents(como_ajudaria),
            );
            return interaction.showModal(modal);
        };

        if (interaction.isModalSubmit() && interaction.customId === "modal_staff") {
            const channel_form = interaction.guild.channels.cache.get(config.canal_formulario)

            const idade_e_nome = interaction.fields.getTextInputValue("idade_e_nome");
            const sobre_voce = interaction.fields.getTextInputValue("sobre_voce");
            const motivo_admissao = interaction.fields.getTextInputValue("motivo_admissao");
            const areas_staffs = interaction.fields.getTextInputValue("areas_staffs");
            const como_ajudaria = interaction.fields.getTextInputValue("como_ajudaria");

            interaction.reply({ content: `Olá  ${interaction.user}, recebemos seu formulário, aguarde uma resposta em breve!`, ephemeral: true })

            const ave = await channel_form.send({
                content: `Formulário de ${interaction.user} (\`${interaction.user.id}\`)`
                , embeds: [
                    new Discord.EmbedBuilder()
                        .setColor("#4EA6CA")
                        .setTitle(`${interaction.user.name}`)
                        .setImage("https://media.discordapp.net/attachments/1121941833451323412/1150054384399560734/286_Sem_Titulo_20230907222617.png?width=1025&height=323")
                        .setThumbnail(interaction.user.displayAvatarURL({ size: 512, format: "png" }))
                        .addFields({ name: `\`1\`. Idade e Nome`, value: `<:reply:1117123344337207438>${idade_e_nome}`, inline: false })
                        .addFields({ name: `\`2\`. Já participou de alguma staff?`, value: `<:reply:1117123344337207438>${sobre_voce}`, inline: false })
                        .addFields({ name: `\`3\`. Por que deseja fazer parte da equipe?`, value: `<:reply:1117123344337207438>${motivo_admissao}`, inline: false })
                        .addFields({ name: `\`4\`. Quais das áreas quer atuar?`, value: `<:reply:1117123344337207438>${areas_staffs}`, inline: false })
                        .addFields({ name: `\`5\`. De qual forma ajudaria nesta área desejada?`, value: `<:reply:1117123344337207438>${como_ajudaria}`, inline: false })
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Aceitar")
                                .setCustomId("aceitar_button")
                                .setStyle(Discord.ButtonStyle.Success)
                        )
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setLabel("Negar")
                                .setCustomId("negar_button")
                                .setStyle(Discord.ButtonStyle.Danger)
                        )
                ]
            })
            await db.set(ave.id, {
                usuario: interaction.user.id,
            });
        }
    }
}