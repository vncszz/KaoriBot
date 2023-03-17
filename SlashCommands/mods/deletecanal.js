const dc = require('discord.js');

module.exports = {
    name: 'deletecanal',
    description: '[🚫] • Comando para deletar um canal.',
    type: 1,

    run: async (client, interaction) => {

        const e = new dc.EmbedBuilder()
            .setDescription(`<:awp_c_0:1065717278940856390> Eu não tenho a permissão **Gerenciar Canais** no servidor!`)
            .setColor('#000000')

        const e1 = new dc.EmbedBuilder()
            .setDescription(`<:awp_c_0:1065717278940856390> Você não tem a permissão **Gerenciar Canais** no servidor!`)
            .setColor('#000000')

        if (!interaction.member.permissions.has(dc.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [e1], ephemeral: true })
        if (!interaction.guild.members.me.permissions.has(dc.PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [e], ephemeral: true })

        const e2 = new dc.EmbedBuilder()
            .setTitle(`⛔ Deletarcanal`)
            .setDescription(`Você está prestes a apagar o canal ${interaction.channel}, \n\n**Lembrando que essa ação é irreversível!**`)
            .setColor('#000000')
            .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true }) })
            .setTimestamp()

        const ac = new dc.ActionRowBuilder()
            .addComponents(
                new dc.ButtonBuilder()
                    .setLabel("Sim")
                    .setCustomId("yes")
                    .setStyle(3)
                    .setEmoji("✅"),
                new dc.ButtonBuilder()
                    .setLabel("Não")
                    .setCustomId("no")
                    .setStyle(4)
                    .setEmoji("❌")
            )

        const ii = await interaction.reply({ embeds: [e2], components: [ac] })

        const ccl = ii.createMessageComponentCollector()
        ccl.on("collect", async (wiu) => {

            if (wiu.user.id !== interaction.user.id) return;

            switch (wiu.customId) {

                case "yes":

                    const e3 = new dc.EmbedBuilder()
                        .setDescription("\n\n⚠ **Este canal será apagado em \`5\` segundos.**")
                        .setColor("#000000")
                        .setTimestamp()

                    wiu.update({ embeds: [e3], components: [] }).then(() => {
                        setTimeout(() => {


                            interaction.channel.delete().catch(er => {

                                const e4 = new dc.EmbedBuilder()
                                    .setDescription(`<:awp_c_0:1065717278940856390> **Não foi possível deletar este canal.**`)
                                    .setColor("#000000");
                                wiu.followUp({ embeds: [e4] })

                                console.log(er);
                                interaction.deleteReply();
                            })


                        }, 5000)
                    })

                    break;

                case "no":

                    const e5 = new dc.EmbedBuilder()
                        .setDescription(`⚠ **O exclusão do canal foi cancelado pelo autor.**`)
                        .setColor("#000000")

                    wiu.update({ embeds: [e5], components: [] })

                    break;

                default: return;

            }

        })
    }
};
