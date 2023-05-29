const {
    SlashCommandBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
} = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gerenciar-parcerias")
        .setDescription("Adicionar ou remover usuário!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand((sub) =>
            sub
                .setName("adicionar")
                .setDescription("Adicionar pontos para usuário(a)")
                .addNumberOption((number) =>
                    number
                        .setName("quantidade")
                        .setDescription(
                            "digite a quantidade que será adicionada ao usuário(a)"
                        )
                        .setMinValue(1)
                        .setRequired(true)
                )
                .addUserOption((user) =>
                    user
                        .setName("user")
                        .setDescription("escolhar o(a) usuário(a)")
                        .setRequired(true)
                )
        )
        .addSubcommand((sub) =>
            sub
                .setName("remover")
                .setDescription("Remover pontos de usuário(a)")
                .addNumberOption((number) =>
                    number
                        .setName("quantidade")
                        .setDescription(
                            "digite a quantidade que será removida ao usuário(a)"
                        )
                        .setMinValue(1)
                        .setRequired(true)
                )
                .addUserOption((user) =>
                    user
                        .setName("user")
                        .setDescription("escolhar o(a) usuário(a)")
                        .setRequired(true)
                )
        ),
    /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { options } = interaction;

        const user = options.getUser("user");
        const quantidade = options.getNumber("quantidade");

        if (options.getSubcommand() === "adicionar") {
            await db.add(`Parcerias_${user.id}`, quantidade);

            interaction.reply({
                content: `Você adicinou \`${quantidade}\` pontos para o usuário(a): ${user}.`,
                ephemeral: true,
            });
        } else if (options.getSubcommand() === "remover") {
            await db.delete(`Parcerias_${user.id}`, quantidade);

            interaction.reply({
                content: `Você removeu \`${quantidade}\` pontos do usuário(a): ${user}.`,
                ephemeral: true,
            });
        }
    },
};
