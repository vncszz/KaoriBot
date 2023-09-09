const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear-dm")
        .setDescription("Limpa as minhas mensagens de sua dm."),

    async execute(interaction) {

        const { client } = interaction;
        
        const dm = await interaction.member.createDM();
        await interaction.reply({
            content: `🔁 **| ${interaction.user}, Estou limpando sua dm, já estava ficando cansada de tantas mensagens**`,
            ephemeral: true,
        });

        setTimeout(() => {
            interaction.editReply({
                content: `✅ **| ${interaction.user}, Limpei com sucesso sua DM, Uffa! agora estou mais leve.**`

            })
        }, 5000)

        setTimeout(() => {
            interaction.editReply({
                content: `📝 **| ${interaction.user}, para deletar essa mensagem clique em "Ignorar Mensagem".**`,
            })
        }, 15000);

        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 100 });

        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
};
