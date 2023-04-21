const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banir um usuário do servidor.")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("membro")
                .setDescription("User a ser banido.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("motivo")
                .setDescription("Motivo pelo ban.")
        ),

    async execute(interaction) {

        const channelLog = interaction.guild.channels.cache.get("1096553099365199882");
        const user = interaction.options.getUser("membro");
        const member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString("motivo") || "Nenhum Motivo Informado.";

        if (interaction.user.id === user.id) {
            return interaction.reply({ content: `Você não pode se banir!`, ephemeral: true });
        }
        if ((await interaction.guild.fetchOwner()).id === user.id) {
            return interaction.reply({ content: `você não pode banir o dono do servidor!`, ephemeral: true });
        }
        if (!member || !member.bannable) {
            return interaction.reply({ content: `Não posso banir este membro!`, ephemeral: true });
        }

        if ((await interaction.guild.bans.fetch()).get(user.id)) {
            return interaction.reply({ content: `Este membro já foi banido!`, ephemeral: true });
        }

        try {
            await user.send(`Você foi banido de ${interaction.guild.name} por ${interaction.user.tag}.\nMotivo: ||${reason}||`);
        } catch (err) { }

        await interaction.guild.members.ban(user, { reason: reason });

        const embed_log = new EmbedBuilder()
            .setColor("#DE4646")
            .setTitle("Punições | Naomi™")
            .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
            .setDescription(`**Usuário:** ${user.tag}\n**ID:** (\`${user.id}\`)\n**Motivo:** ${reason}\n\nStaff Responsável: ${interaction.user.username}`)
            .setTimestamp(new Date)
            .setFooter({ text: `${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true }) })

        channelLog.send({ embeds: [embed_log] });

        await interaction.reply(`${interaction.user} Você baniu ${user.tag}.\nMotivo: ||\`${reason}\`||`);
    }
}