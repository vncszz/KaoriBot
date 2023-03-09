const Discord = require("discord.js");
let Dono ='523665234351751168'

module.exports = {
    name: "setstatus",
    description: "[🔮] • Configure o Status da Naomi.",
    options: [
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "status",
            description: "Qual estilo você deseja aplicar (online, dnd, idle, invisible)?",
            required: true,
        },
        {
            type: Discord.ApplicationCommandOptionType.String,
            name: "descrição",
            description: "Qual será a descrição do status?",
            required: true,
        }
    ],

    run: async (client, interaction) => {

        if (interaction.user ===! Dono) return interaction.reply({ content: `Apenas meu dono pode utilizar este comando!`, ephemeral: true })

        try {

            let status = interaction.options.getString("status");
            let desc = interaction.options.getString("descrição");

            client.user.setStatus(`${status}`);

            client.user.setPresence({
                activities: [{
                    name: desc,
                }],
            });

            let embed = new Discord.EmbedBuilder()
                .setColor("Green")
                .setTitle("Status atualizado!")
                .addFields(
                    {
                        name: `🔮 Mudei meu status para:`,
                        value: `\`${status}\`.`,
                        inline: false
                    },
                    {
                        name: `📝 Mudei minha descrição para:`,
                        value: `\`${desc}\`.`,
                        inline: false
                    }
                )

            await interaction.reply({ embeds: [embed], ephemeral: true});

        } catch (error) {
            return console.log(`Ops ${interaction.user}, algo deu errado ao executar este comando.`)
        }
    }
}