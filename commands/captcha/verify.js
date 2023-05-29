const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const capschema = require('../../Models/verify');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDMPermission(false)
        .setDescription('Configure o sistema de captcha')
        .addSubcommand(command => command.setName('setup').setDescription('Configura o sistema de verificação para você.').addRoleOption(option => option.setName('role').setDescription('O cargo especificada será dada aos usuários que são verificados.').setRequired(true)).addChannelOption(option => option.setName('channel').setDescription('Especifique o canal onde o painel irá mostrar').setRequired(true).addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)).addStringOption(option => option.setName('content').setDescription('A mensagem especificada será incluída fora da embed.').setRequired(false).setMinLength(1).setMaxLength(1000)))
        .addSubcommand(command => command.setName('disable').setDescription('Desativa seu sistema de verificação.')),
    async execute(interaction, client) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && interaction.user.id !== '1077794931566989434') return await interaction.reply({ content: 'você não tem **permissao** pra isso!', ephemeral: true });

        const data = await capschema.findOne({ Guild: interaction.guild.id });
        const sub = interaction.options.getSubcommand();

        switch (sub) {
            case 'setup':

                const role = await interaction.options.getRole('role');
                const channel = await interaction.options.getChannel('channel');
                const message = await interaction.options.getString('content') || 'Clique no botão abaixo para verificar!';

                if (data) return await interaction.reply({ content: `Você **já** tem um sistema de verificação **configurado**! \n> Faça **/verify disable** para desfazer.`, ephemeral: true });
                else {

                    await capschema.create({
                        Guild: interaction.guild.id,
                        Role: role.id,
                        Channel: channel.id,
                        Message: 'empty',
                        Verified: []
                    })

                    const buttons = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('verify')
                                .setLabel('✅ Verificar')
                                .setStyle(ButtonStyle.Success)
                        )

                    const verify = new EmbedBuilder()
                        .setColor('Green')
                        .setThumbnail(interaction.guild.iconURL())
                        .setTimestamp()
                        .setTitle('• Sistema de Verificação')
                        .setAuthor({ name: `✅ Processo de Verificação` })
                        .setFooter({ text: `✅ Verificação Prompt` })
                        .setDescription(`> ${message}`)

                    interaction.reply({ content: `Seu **sistema de verificação** foi configurado!`, ephemeral: true });
                    const msg = await channel.send({ embeds: [verify], components: [buttons] });

                    await capschema.updateOne({ Guild: interaction.guild.id }, { $set: { Message: msg.id } });
                }

                break;
            case 'disable':

                if (!data) return await interaction.reply({ content: `O **sistema de verificação** ainda não foi **configurado**..`, ephemeral: true });
                else {

                    await capschema.deleteMany({ Guild: interaction.guild.id });
                    const deletemsg = await client.channels.cache.get(data.Channel).messages.fetch(data.Message);
                    await deletemsg.delete();

                    await interaction.reply({ content: `Sua verificação foi desativada!`, ephemeral: true });

                }
        }
    }
}