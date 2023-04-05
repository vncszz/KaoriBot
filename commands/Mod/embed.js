const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embedcreator")
        .setDescription(`Make a new embed`)
        .addStringOption((option) =>
            option
                .setName("titulo")
                .setDescription(`O titulo da sua embed`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription(`A descrição de sua embed (use \\n Para pular linha)`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("image")
                .setDescription(`A imagem de sua embed`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("thumbnail")
                .setDescription(`A thumbnail de sua embed`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("footer")
                .setDescription(`O rodapé da embed`)
                .setRequired(false)
        )
        .addBooleanOption((option) =>
            option
                .setName("inline")
                .setDescription(`esse campo deve ser inline?`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("fields")
                .setDescription(
                    `Títulos e valores de campo (formato: title1;value1\\nvalue1Paragraph2,title2;value2)`
                )
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("color")
                .setDescription("Selecione uma cor.")
                .setRequired(false)
                .addChoices(
                    { name: 'Default', value: 'Default' },
                    { name: 'Aqua', value: 'Aqua' },
                    { name: 'DarkAqua', value: 'DarkAqua' },
                    { name: 'Green', value: 'Green' },
                    { name: 'DarkGreen', value: 'DarkGreen' },
                    { name: 'Blue', value: 'Blue' },
                    { name: 'DarkBlue', value: 'DarkBlue' },
                    { name: 'Purple', value: 'Purple' },
                    { name: 'DarkPurple', value: 'DarkPurple' },
                    { name: 'LuminousVividPink', value: 'LuminousVividPink' },
                    { name: 'DarkVividPink', value: 'DarkVividPink' },
                    { name: 'Gold', value: 'Gold' },
                    { name: 'DarkGold', value: 'DarkGold' },
                    { name: 'Orange', value: 'Orange' },
                    { name: 'DarkOrange', value: 'DarkOrange' },
                    { name: 'Red', value: 'Red' },
                    { name: 'DarkRed', value: 'DarkRed' },
                    { name: 'Grey', value: 'Grey' },
                    { name: 'DarkGrey', value: 'DarkGrey' },
                    { name: 'DarkerGrey', value: 'DarkerGrey' },
                    { name: 'LightGrey', value: 'LightGrey' },
                    { name: 'Navy', value: 'Navy' },
                    { name: 'DarkNavy', value: 'DarkNavy' },
                    { name: 'Yellow', value: 'Yellow' }

                )),

    async execute(interaction) {
        const { options } = interaction;

        const title = options.getString("titulo");
        const description = options.getString("description").replace(/\\n/g, "\n");
        const image = options.getString("image");
        const thumbnail = options.getString("thumbnail");
        const footer = options.getString("footer") || " ";
        const color = interaction.options.getString("color");

        let fields = [];

        const fieldsOption = options.getString("fields");
        if (fieldsOption) {
            const fieldPairs = fieldsOption.split(",");
            for (const fieldPair of fieldPairs) {
                const [fieldName, fieldValue] = fieldPair.split(";");
                fields.push({
                    name: fieldName,
                    value: fieldValue.replace(/\\n/g, "\n"),
                    inline: options.getBoolean("inline") || false,
                });
            }
        }

        if (image) {
            if (!image.startsWith("http"))
                return await interaction.reply({
                    content: "Você não pode fazer disso sua imagem.",
                    ephemeral: true,
                });
        }

        if (thumbnail) {
            if (!thumbnail.startsWith("http"))
                return await interaction.reply({
                    content: "Você não pode por essa thumbnail.",
                    ephemeral: true,
                });
        }

        const embed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color)
            .setImage(image)
            .setThumbnail(thumbnail)
            .addFields(fields)
            .setFooter({
                text: `${footer}`,
                iconURL: interaction.member.displayAvatarURL({ dynamic: true }),
            });

        await interaction.reply({
            content: "Sua embed foi criada.",
            ephemeral: true,
        });

        await interaction.channel.send({ embeds: [embed] });
    },
};
