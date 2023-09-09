const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js")
const { SlashCommandBuilder } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('send')
        .setDescription('.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false)
        .addSubcommand(subcommand => subcommand
            .setName('private')
            .setDescription('.')
            .addUserOption(user => user
                .setName('user')
                .setDescription('.')
                .setRequired(true)
            )
            .addStringOption(option => option
                .setName('message')
                .setDescription('.')
                .setRequired(true)
            )
        ),
    async execute(interaction) {

        const member = interaction.options.getMember('user');
        const string = interaction.options.getString('message');

        if (!member) {
            interaction.reply({ content: `**|** O usuário ${interaction.user} não esta no servidor.`, ephemeral: true });
            return;
        }

        if (member.user?.bot) {
            interaction.reply({ content: `**|** Você não pode enviar mensagem privadas para um bot.`, ephemeral: true })
            return;
        }

        if (interaction.member === member) {
            interaction.reply({ content: `**|** Você não pode enviar uma mensagem privada para você mesmo.`, ephemeral: true })
            return;
        }

        const button = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setStyle(ButtonStyle.Success)
                    .setLabel('Visualizar mensagem privada')
                    .setCustomId('private-message')
            )

        member.send({ content: `Mensagem privada para ${member}!`, components: [button] }).then(async (log) => {
            await db.set(`Private/Messages/${log.id}`, {
                data: string,
                author: interaction.user.id
            })
            interaction.reply({ content: `**|** Mensagem enviada com sucesso para ${member}!`, ephemeral: true })
            return;
        })
    }
}