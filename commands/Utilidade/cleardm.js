const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName("cleardm")
        .setDescription(`[🧹] • Limpe todas as mensagens da Naomi da sua DM`),
    async execute(interaction) {

        const { client } = interaction;

        const dm = await interaction.member.createDM();
        await interaction.reply({
            content: `🔁 **| ${interaction.user}, Estou limpando sua dm, já estava ficando cansada de tantas mensagens**`,
            ephemeral: false,
        });

        setTimeout(() => {
            interaction.editReply({
                content: `✅ **| ${interaction.user}, Limpei com sucesso sua DM, Uffa! agora estou mais leve.**`

            })
        }, 5000)

        /*setTimeout(() => {
            interaction.editReply({
                content: `📝 **| ${interaction.user}, para deletar essa mensagem clique em "Ignorar Mensagem".**`,
            })
        }, 15000);*/

        const deleteMessages = await client.channels.cache
            .get(dm.id)
            .messages.fetch({ limit: 99 });

        await deleteMessages.map((msg) => {
            if (msg.author.bot) {
                msg.delete();
            }
        });
    }
}