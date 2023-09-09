const Discord = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("webhook-create")
        .setDescription("Criar Webhooks")
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addChannelOption((option) => option.setName("canal").setDescription("Canal onde será criado a webhook.").setRequired(false).addChannelTypes(Discord.ChannelType.GuildText))
        .addStringOption((option) => option.setName("nome").setDescription("Nome do webhook").setRequired(false))
        .addAttachmentOption((option) => option.setName("avatar").setDescription("Avatar da Webhook.").setRequired(false)),

    async execute(interaction) {

        try {
            const channel = interaction.options.getChannel("canal") || interaction.channel;
            const nome = interaction.options.getString("nome") || "Captain Hook";
            const avatar = interaction.options.getAttachment("avatar");

            const webhook = await channel.createWebhook({
                name: nome,
                avatar: avatar ? avatar.url : undefined
            });

            const embed = new Discord.EmbedBuilder()
                .setColor("Random")
                .setTitle("Webhook Criada")
                .setThumbnail(webhook.avatarURL())
                .setDescription(`Nome: ${webhook.name} \nLink: ${webhook.url}\nCanal:${channel} `)

            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.error(error);
            interaction.reply({ content: `Ocorreu um erro ao criar a webhook ${config.emojis.errado} `, ephemeral: true });
        }
    },
};
