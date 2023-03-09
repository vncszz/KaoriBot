const Discord = require('discord.js')
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: 'set-cargo-moderate',
    description: "[🎟️] • Setar o cargo de Moderação.",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cargo",
            description: "Escolha o cargo de moderação.",
            type: Discord.ApplicationCommandOptionType.Role,
            required: true,
        },
    ],

    run: async (client, interaction, args) => {

        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.Administrator)) {
            interaction.reply({ content: `**❌ - Você não possui permissão para utilizar este comando.**`, ephemeral: true })
        } else {

            let cargoM = interaction.options.getRole("cargo")


            await db.set('cargoModerate', { cargoM })

            let embedCargoModerate = new Discord.EmbedBuilder()
                .setDescription(`**✅ - Cargo ${cargoM} setado para Cargo de Moderação!**`)
                .setColor('Random')
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` })

            interaction.reply({ embeds: [embedCargoModerate] })



        }


    }
} 