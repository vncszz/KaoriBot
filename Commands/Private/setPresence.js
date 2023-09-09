const { ActivityType, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require("../../config.json");
const client = require("../../index");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("set-presence")
        .setDescription("Apenas Desenvolvedor.")
        .addStringOption((option) => option
            .setName("status_personalizado")
            .setDescription("Nome dos Status")
            .setRequired(true))

        .addStringOption((option) => option
            .setName("status_do_bot")
            .setDescription("Status do Bot")
            .addChoices(
                { name: "dnd", value: `dnd` },
                { name: "Idle", value: `Idle` },
                { name: "Online", value: `Online` },
                { name: "Invisible", value: `Invisible` },
            ).setRequired(true))

        .addStringOption((option) => option
            .setName("type")
            .setDescription("Atividade de bot")
            .addChoices(
                { name: `Remover`, value: `0` },
                { name: `Playing`, value: `Playing` }, // Jogando
                { name: `Listening`, value: `Listening` }, // Ouvindo
                { name: `Watching`, value: `Watching` }, // Assistindo
                { name: `Competing`, value: `Competing` }, // Competindo
            ).setRequired(true))
    ,

    async execute(interaction) {

        if (!interaction.member.permissions.has(config.perms.desenvolvedor)) {
            return interaction.reply({ content: `**Esse comando é apenas para meu desenvolvedor!**`, ephemeral: true })
        } else {

            const atividade_bot = interaction.options.getString(`status_personalizado`);

            if (atividade_bot.length > 128) {
                return interaction.reply({ ephemeral: true, content: `O limite de caracteres foi atingido! 😢` });
            };

            const status_personalizado = interaction.options.getString(`status_do_bot`)

            client.user.setPresence({
                status: `${status_personalizado}`,
                activities: [{
                    name: `${atividade_bot}`,
                    type: ActivityType[interaction.options.getString(`type`)]
                }]
            });

            await interaction.reply({ content: `👮 | Meu status foi alterado!`, ephemeral: true });
        }

    }
}