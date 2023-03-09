const { ApplicationCommandType } = require("discord.js");

module.exports = {
    name: "unlock",
    description: "[🔓] • Utilize para destrancar um canal",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has("ManageChannels"))
            return interaction.reply(`Você não possui a permissão \`Genrenciar Canais\` para poder utilizar este comando.`);

        if (!interaction.guild.members.me.permissions.has("ManageChannels"))
            return interaction.reply("Parece que estou sem permissões suficientes!");

        interaction.reply({content: `Este chat foi destrancado com sucesso.`, ephemeral: true}).then(() => {
            interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true })
        }).catch(err => {
            interaction.reply("Houve algum erro! Error: " + err);
        });

    },
}