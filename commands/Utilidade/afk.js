const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const afkSchema = require("../../database/models/afkSchema");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("afk")
        .setDescription("defina afk")
        .addSubcommand(command => command.setName("set").setDescription("definir afk no servidor").addStringOption(option => option.setName("message").setDescription("o motivo pelo afk").setRequired(false)))
        .addSubcommand(command => command.setName("remove").setDescription("remova o afk")),

    async execute(interaction) {

        const { options } = interaction;
        const sub = options.getSubcommand();

        const Data = await afkSchema.findOne({ Guild: interaction.guild.id, User: interaction.user.id });

        switch (sub) {
            case 'set':

                if (Data) return await interaction.reply({ content: `Você já está afk nesse servidor`, ephemeral: true });
                else {
                    const message = options.getString('message');
                    const nickname = interaction.member.nickname || interaction.user.username;

                    await afkSchema.create({
                        Guild: interaction.guild.id,
                        User: interaction.user.id,
                        Message: message,
                        Nickname: nickname
                    })

                    const name = `[AFK] ${nickname}`;
                    await interaction.member.setNickname(`${name}`).catch(err => {
                        return;
                    })

                    const embed = new EmbedBuilder()
                        .setColor('White')
                        .setDescription(`Você está afk! use **/afk remove** ou envie uma mensagem no chat, para o modo ser desativado!`)

                    await interaction.reply({ embeds: [embed], ephemeral: true });

                }

                break;
            case 'remove':

                if (!Data) return await interaction.reply({ content: `Você não está afk nesse servidor`, ephemeral: true });
                else {
                    const nick = Data.Nickname;
                    await afkSchema.deleteMany({ Guild: interaction.guild.id, User: interaction.user.id });

                    await interaction.member.setNickname(`${nick}`).catch(err => {
                        return;
                    })

                    const embed = new EmbedBuilder()
                        .setColor('White')
                        .setDescription(`Você não está mais afk!`)

                    await interaction.reply({ embeds: [embed], ephemeral: true });
                }

        }
    }
}