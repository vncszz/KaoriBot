const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-sticker')
        .setDescription('Adicione uma figura no servidor')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {

        await interaction.reply(`<a:Loading:1077708788808810576> Esperando por sua figura...`)
        const filter = (m) => m.author.id === interaction.user.id;
        const collector = interaction.channel.createMessageCollector({ filter: filter, time: 15000, max: 1 });

        collector.on('collect', async m => {
            const sticker = m.stickers.first();

            const { guild } = interaction;

            if (m.stickers.size == 0) return await interaction.editReply(`Isso não é uma figura...`)

            if (sticker.url.endsWith('.json')) return await interaction.editReply(`Nenhuma figura válida..`)

            if (!guild.members.me.permissions.has(PermissionFlagsBits.ManageGuildExpressions)) return await interaction.editReply(`<a:nopers:1116081350320083034> I do not have permissions to add stickers to the server.`)
            try {
                const newSticker = await guild.stickers.create({
                    name: sticker.name,
                    description: sticker.description || '',
                    tags: sticker.tags,
                    file: sticker.url
                })

                await interaction.editReply(`<:corretoaz:1077748385358028910> Figurinha com o nome **${newSticker.name}** adicionada no servidor!`)
            } catch (err) {
                console.log(err)
                await interaction.editReply(`A figura atingiu o tamanho máximo.`)
            }

        })

        collector.on('end', async reason => {
            if (reason === 'time') return await interaction.editReply(`Ran out of time..`)

        })
    }
}