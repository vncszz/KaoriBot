const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role-all')
        .setDescription('Dá a todos os membros um cargo especificada')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('qual será o cargo?')
                .setRequired(true)
        ),

    async execute(interaction) {
        // Check if user has the MANAGE_ROLES permission
        if (!interaction.member.permissions.has(PermissionFlagsBits.MANAGE_ROLES)) {
            const embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription('Você não tem permissão pra isso.');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // Get the role option from the user's input
        const role = interaction.options.getRole('role');

        // Get all members in the server
        const members = await interaction.guild.members.fetch();

        // Give the role to all members
        members.forEach(member => {
            if (!member.roles.cache.has(role.id)) {
                member.roles.add(role);
            }
        });

        // Send a success message

        return interaction.reply({ content: `Feito! Dei o cargo \`${role.name}\` Para todos os membros.`, ephemeral: true });
    },
};
