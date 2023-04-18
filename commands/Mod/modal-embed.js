const {
    TextInputStyle,
    SlashCommandBuilder,
    EmbedBuilder,
    TextInputBuilder,
    PermissionFlagsBits,
    ActionRowBuilder,
    ModalBuilder,
} = require('discord.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName("modal-embed")
        .setDescription("Crie uma embed por modal")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addAttachmentOption((option) => option.setName("arquivo").setDescription("anexar algo fora da embed.").setRequired(true)),

    async execute(interaction) {

        const { client } = interaction;
        const arquivo = interaction.options.getAttachment("arquivo") || " ";

        const modal = new ModalBuilder()
            .setCustomId('MyFirstModal')
            .setTitle('Criar Embed 🔪')

        const TítuloEmbed = new TextInputBuilder()
            .setCustomId('TítuloEmbed')
            .setLabel('Título da Embed')
            .setPlaceholder(`Insira o título da Embed.`)
            .setStyle(TextInputStyle.Short)

        const Descrição = new TextInputBuilder()
            .setCustomId('Descrição')
            .setLabel('Descrição da Embed')
            .setPlaceholder(`Insira a descrição da Embed.`)
            .setStyle(TextInputStyle.Paragraph)

        const Cor = new TextInputBuilder()
            .setCustomId('Cor')
            .setLabel('Cor da Embed')
            .setPlaceholder(`Insira o HEX de uma cor..`)
            .setStyle(TextInputStyle.Short)

        const Footer = new TextInputBuilder()
            .setCustomId('Footer')
            .setLabel('Rodapé da embed')
            .setPlaceholder(`Insira o footer.`)
            .setStyle(TextInputStyle.Short)
            .setRequired(false)

        const PrimeiraActionRow = new ActionRowBuilder().addComponents(TítuloEmbed);
        const SegundaActionRow = new ActionRowBuilder().addComponents(Descrição);
        const TerceiraActionRow = new ActionRowBuilder().addComponents(Cor);
        const quartaActionRow = new ActionRowBuilder().addComponents(Footer);

        modal.addComponents(PrimeiraActionRow, SegundaActionRow, TerceiraActionRow, quartaActionRow)

        await interaction.showModal(modal);

        client.once('interactionCreate', async interaction => {
            if (!interaction.isModalSubmit()) return;

            if (interaction.customId === 'MyFirstModal') {

                const DescriçãoEmbed = interaction.fields.getTextInputValue('Descrição');
                const TítuloEmbed = interaction.fields.getTextInputValue('TítuloEmbed');
                const Cor = interaction.fields.getTextInputValue('Cor');
                const Footer = interaction.fields.getTextInputValue('Footer') || " ";

                const embedModal1 = new EmbedBuilder()
                    .setColor(`${Cor}`)
                    .setTitle(`${TítuloEmbed}`)
                    .setDescription(`${DescriçãoEmbed}`)
                    .setFooter({ text: `${Footer}` })

                interaction.reply({
                    content: "Embed criada com sucesso! aguarde um momento que estarei enviando neste canal..",
                    ephemeral: true,
                });

                await interaction.channel.send({ embeds: [embedModal1], files: [arquivo] });
            }
        });

    }
}