const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Veja meu tempo de respostas.'),
    async execute(interaction) {

        const { client } = interaction;

        let ping = client.ws.ping;

        const icon = interaction.user.displayAvatarURL();
        const tag = interaction.user.tag;

        const embed = new EmbedBuilder()
            .setTitle('**`🏓・PONG!`**')
            .setDescription(`**\`🍯・LATÊNCIA: ${ping}ms\`**`)
            .setColor("Yellow")
            .setFooter({ text: `Pedido por: ${tag}`, iconURL: icon })
            .setTimestamp()

        const btn = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('btn')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('🔁')
            )

        const msg = await interaction.reply({ embeds: [embed], components: [btn], ephemeral: false })


        const collector = msg.createMessageComponentCollector()
        collector.on('collect', async i => {
            if (i.customId == 'btn') {
                i.update({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle('**`🏓・PONG!`**')
                            .setDescription(`**\`🍯・LATÊNCIA: ${ping}ms\`**`)
                            .setColor("Yellow")
                            .setFooter({ text: `Pedido por: ${tag}`, iconURL: icon })
                            .setTimestamp()
                    ], components: [btn], ephemeral: false
                })
            }
        })
    }
}