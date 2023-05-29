const {
    SlashCommandBuilder,
    Client,
    EmbedBuilder,
    ButtonBuilder,
    ActionRowBuilder,
    ChatInputCommandInteraction,
    PermissionFlagsBits,
    ChannelType,
} = require("discord.js");
const antiscamSchema = require("../../Models/antiscam");
const antiscamLogSchema = require("../../Models/antiscamLogChannel");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup-antiscam")
        .setDescription("Impedir que membros no servidor Discord enviem links fraudulentos.")
        .addChannelOption(option =>
            option.setName("log-channel")
                .setDescription("Escolha o canal para registrar as violações.")
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDMPermission(false),

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction, client) {
        const guild = interaction.guild;
        const logChannel = interaction.options.getChannel("log-channel");

        await interaction.deferReply();

        let requireDB = await antiscamSchema.findOne({ _id: guild.id });
        let logSchema = await antiscamLogSchema.findOne({ Guild: guild.id });

        if (logSchema) {
            await antiscamLogSchema.create({
                Guild: guild.id,
                logChannel: logChannel.id
            })
        } else if (!logSchema) {
            await antiscamLogSchema.create({
                Guild: guild.id,
                logChannel: logChannel.id
            })
        }

        const sistema = requireDB?.logs === true ? "📗 Ativado" : "📕 Desativado";

        const e2 = new EmbedBuilder()
            .setTitle(`📎 Antiscam`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setColor("Random")
            .setDescription(
                `Antiscam de ${guild.name}\n\nO sistema está atualmente [\`${sistema}\`](https://discord.gg/animesbrasil).\nUse o botão abaixo para configurar o status antiscam do servidor.\nCanal de log atual: <#${logChannel.id}>.`
            )
            .setFooter({
                text: guild.name,
                iconURL: guild.iconURL({ dynamic: true }),
            })
            .setTimestamp(new Date());

        const b = new ButtonBuilder()
            .setLabel(`Ativar`)
            .setCustomId(`true`)
            .setStyle(3)
            .setEmoji(`📗`);

        const b1 = new ButtonBuilder()
            .setLabel(`Desativar`)
            .setCustomId(`false`)
            .setStyle(4)
            .setEmoji(`📕`);

        const ac = new ActionRowBuilder().addComponents(b, b1);

        const tf = await interaction.editReply({ embeds: [e2], components: [ac] });

        const coll = tf.createMessageComponentCollector();

        coll.on("collect", async (ds) => {
            if (ds.user.id !== interaction.user.id) return;

            if (ds.customId === `true`) {
                const e = new EmbedBuilder()
                    .setDescription(`📗 O sistema Antiscam foi definido como **Ativo**!`)
                    .setColor("Aqua");

                ds.update({ embeds: [e], components: [] });

                await antiscamSchema.findOneAndUpdate(
                    { _id: guild.id },
                    {
                        $set: { logs: true },
                    },
                    { upsert: true }
                );
            } else if (ds.customId === `false`) {
                const e = new EmbedBuilder()
                    .setDescription(`📕 O sistema Antiscam foi definido como **Desativado**!`)
                    .setColor("Red");

                ds.update({ embeds: [e], components: [] });

                await antiscamSchema.findOneAndUpdate(
                    { _id: guild.id },
                    {
                        $set: { logs: false },
                    },
                    { upsert: true }
                );
            }
        });
    },
};