const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embedcreator")
        .setDescription(`Crie uma embed`)
        .addStringOption((option) =>
            option
                .setName("titulo")
                .setDescription(`Esse será o titulo da embed.`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("description")
                .setDescription(`Esse será a descrição da embed. (use \\n para quebrar linha.)`)
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName("image")
                .setDescription(`Esse será a imagem da embed.`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("thumbnail")
                .setDescription(`Esse será a miniatura da embed.`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("footer")
                .setDescription(`Esse será o rodapé da embed.`)
                .setRequired(false)
        )
        .addBooleanOption((option) =>
            option
                .setName("inline")
                .setDescription(`caso queira algo na mesma linha.`)
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("fields")
                .setDescription(
                    `Títulos e valores de campo (formato: titulo1;valor1\\nvalor1paragrafo2,titulo2;valor2)`
                )
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName("cor")
                .setDescription("Selecione uma cor, ou deixe como default.")
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
        let footer = reponse.fields.getTextInputValue('footer') || null
        const color = interaction.options.getString("cor");

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
                    content: "você não pode fazer disto a image",
                    ephemeral: true,
                });
        }

        if (thumbnail) {
            if (!thumbnail.startsWith("http"))
                return await interaction.reply({
                    content: "você não pode fazer disto a thumbnail..",
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
            content: "Embed criada com sucesso.",
            ephemeral: true,
        });

        await interaction.channel.send({ embeds: [embed] });
    },
};
