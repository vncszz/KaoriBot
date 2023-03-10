const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const Discord = require("discord.js")
const ms = require('ms');

module.exports = {

    name: 'mute',
    description: 'mute um usuário.',
    options: [
        {
            name: 'usuário',
            description: 'mencione o usuário que será mutado.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'tempo',
            description: 'duração do mute (30m, 1h, 1 dia).',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'motivo',
            description: 'motivo do mute.',
            type: Discord.ApplicationCommandOptionType.String,
        },
    ],

    /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */
    permissionsRequired: [PermissionFlagsBits.MuteMembers],
    botPermissions: [PermissionFlagsBits.MuteMembers],

    run: async (client, interaction) => {

       
        const usuário = interaction.options.get('usuário').value;
        const tempo = interaction.options.get('tempo').value; // 1d, 1 day, 1s 5s, 5m
        const motivo = interaction.options.get('motivo')?.value || 'Nenhum Motivo';

        await interaction.deferReply();

        const targetUser = await interaction.guild.members.fetch(usuário);
        if (!targetUser) {
            await interaction.editReply("Esse usuário não pertence a este servidor.");
            return;
        }

        if (targetUser.user.bot) {
            await interaction.editReply("Não consigo mutar um bot.");
            return;
        }

        const msDuration = ms(tempo);
        if (isNaN(msDuration)) {
            await interaction.editReply('Forneça uma duração de tempo limite válida.');
            return;
        }

        if (msDuration < 5000 || msDuration > 2.592e+9) {
            await interaction.editReply('A duração do tempo limite não pode ser inferior a 5 segundos ou superior a 30 dias.');
            return;
        }

        const targetUserRolePosition = targetUser.roles.highest.position; // Highest role of the target user
        const requestUserRolePosition = interaction.member.roles.highest.position; // Highest role of the user running the cmd
        const botRolePosition = interaction.guild.members.me.roles.highest.position; // Highest role of the bot

        if (targetUserRolePosition >= requestUserRolePosition) {
            await interaction.editReply("Você não pode mutar esse usuário porque o cargo dele é maior que o seu.");
            return;
        }

        if (targetUserRolePosition >= botRolePosition) {
            await interaction.editReply("Não posso mutar esse usuário porque ele tem o cargo maior que o meu.");
            return;
        }

        // Timeout the user
        try {
            const { default: prettyMs } = await import('pretty-ms');

            if (targetUser.isCommunicationDisabled()) {
                await targetUser.timeout(msDuration, motivo);
                await interaction.editReply(`${targetUser}'s o tempo limite foi atualizado para ${prettyMs(msDuration, { verbose: true })}\nMotivo: ${motivo}`);
                return;
            }

            await targetUser.timeout(msDuration, motivo);
            await interaction.editReply(`${targetUser} foi expirado para ${prettyMs(msDuration, { verbose: true })}.\nMotivo: ${motivo}`);
        } catch (error) {
            console.log(`Ocorreu um erro ao expirar o tempo: ${error}`);
        }

    }
}