const {
    EmbedBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
} = require("discord.js");
const { ButtonBuilder, ActionRowBuilder } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
moment.locale("pt-br");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: "divorciar",
    description: "[💔] • Saia de um casamento abusivo.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Escolha a pessoa que deseja se divorciar.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "motivo",
            description: "Escreva o motivo para o divórcio.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, inter) => {
        const userMarry = inter.options.getUser("user");
        let stringMarry = inter.options.getString("motivo");
        const User = inter.user;
        const tableMarry = db.table("Marry");
        const statusOne = "married";
        const statusTwo = await tableMarry.get(`user_${User.id}.status`);
        let Info = await tableMarry.get(`user_${User.id}.id`);
        const Marriedtime = await tableMarry.get(`userDate_${User.id}`);

        let date_start = moment(new Date(`${Marriedtime}`));
        let date_end = moment(new Date());
        const start = moment(date_start);
        const end = moment(date_end);
        const duration = moment
            .duration(end.diff(start))
            .format("Y [Anos], M [Meses], D [Dias], H [Horas], m [Minutos]");

        const embed = new EmbedBuilder()
            .setColor("Gold")
            .setTitle("📜 PEDIDO DE CASAMENTO")
            .setDescription(
                `Olá ${userMarry}, você acabou de receber um pedido de divórcio de ${User}`
            )
            .addFields({
                name: "💔 Motivo do Divórcio",
                value: `\`\`\`${stringMarry}\`\`\``,
            })
            .setFooter({
                text: `⚠️ Para Aceitar ou Recusar clique nos botões abaixo`,
            });

        const erro = new EmbedBuilder()
            .setColor("FF0000")
            .setDescription(`❌ Ocorreu um erro no pedido de divórcio!!`);

        let aceitar = new ButtonBuilder()
            .setCustomId("aceitar")
            .setEmoji("💔")
            .setLabel("Aceitar")
            .setStyle("Success");

        let recusar = new ButtonBuilder()
            .setCustomId("recusar")
            .setEmoji("💘")
            .setLabel("Recusar")
            .setStyle("Danger");

        const button = new ActionRowBuilder().addComponents(aceitar, recusar);

        await inter
            .reply({
                content: `${userMarry}`,
                embeds: [embed],
                components: [button],
            })
            .catch((err) => {
                inter.reply({ embeds: [erro], ephemeral: true });
            });

        const filtro = (u) => u.user.id === userMarry.id;
        const collect = inter.channel.createMessageComponentCollector({
            filter: filtro,
            max: 1,
        });

        collect.on("collect", async (i) => {
            if (i.customId === "aceitar") {
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("💔 PEDIDO DE DIVÓRCIO ACEITE")
                    .setDescription(`${userMarry} Acabou de se Divórciar de ${User}`);

                await tableMarry.delete(`user_${User.id}`, {
                    id: `${userMarry.id}`,
                    status: "married",
                });
                await tableMarry.delete(`user_${userMarry.id}`, {
                    id: `${User.id}`,
                    status: "married",
                });
                await tableMarry.delete(
                    `userDate_${User.id}`,
                    moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                );
                await tableMarry.delete(
                    `userDate_${userMarry.id}`,
                    moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                );

                await inter.editReply({
                    content: `${User}`,
                    embeds: [embed],
                    components: [],
                });
            }
            if (i.customId === "recusar") {
                const embed = new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle("💔 PEDIDO DE DIVÓRCIO RECUSADO")
                    .setDescription(
                        `${User} Parece que ${userMarry} recusou seu pedido de divócio...`
                    )
                    .addFields({
                        name: "PEDIDO RECUSADO",
                        value: `${User} 💔 ${userMarry}`,
                    });

                await inter.editReply({
                    content: `${User}`,
                    embeds: [embed],
                    components: [],
                });
            }
        });
    },
};
