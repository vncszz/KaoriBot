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
    name: "casar",
    description: "[💐] • Faça um pedido de casamento a alguém.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "user",
            description: "Escolha a pessoa que deseja fazer o pedido.",
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: "declaração",
            description: "Escreva uma declaração para a pessoa.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    run: async (client, inter) => {
        const userMarry = inter.options.getUser("user");
        let stringMarry = inter.options.getString("declaração");
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

        let married = new EmbedBuilder()
            .setColor("Green")
            .setTitle("💍 | Estado Civil")
            .setDescription(
                `Você está em união com <@${Info}>\nEstão em união a **${duration}**`
            );

        const erro = new EmbedBuilder()
            .setColor("FF0000")
            .setDescription(`❌ Você não pode se pedir em casamento`);

        if (userMarry.id === User.id) {
            return inter.reply({ embeds: [erro], ephemeral: true });
        } else {
            if (statusOne === statusTwo) {
                return inter.reply({ embeds: [married], ephemeral: true });
            } else {
                const embed = new EmbedBuilder()
                    .setColor("Gold")
                    .setTitle("📜 PEDIDO DE CASAMENTO")
                    .setDescription(
                        `Olá ${userMarry}, você acabou de receber um pedido de casamento de ${User}`
                    )
                    .addFields({
                        name: "💍 DECLARAÇÃO",
                        value: `\`${stringMarry}\``,
                    })
                    .setFooter({
                        text: `⚠️ Para Aceitar ou Recusar clique nos botões abaixo`,
                    });

                const erro = new EmbedBuilder()
                    .setColor("Red")
                    .setDescription(`❌ Ocorreu um erro no pedido de casamento!!`);

                let aceitar = new ButtonBuilder()
                    .setCustomId("aceitar")
                    .setEmoji("💘")
                    .setLabel("Aceitar")
                    .setStyle("Success");

                let recusar = new ButtonBuilder()
                    .setCustomId("recusar")
                    .setEmoji("💔")
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
                        const erro = new EmbedBuilder()
                            .setColor("FF0000")
                            .setDescription(`❌ Você ja está em um relacionamento`);

                        const userButton = i.user;
                        const statusButton = "married";
                        const statusButton2 = await tableMarry.get(
                            `user_${userButton.id}.status`
                        );

                        if (statusButton === statusButton2) {
                            return i.reply({ embeds: [erro], ephemeral: true });
                        } else {
                            const embed = new EmbedBuilder()
                                .setColor("Green")
                                .setTitle("📜 PEDIDO ACEITO")
                                .setDescription(
                                    `${userMarry} Acabou de aceitar seu pedido de casamento ${User}`
                                )
                                .addFields({
                                    name: "💖 ACABARAM DE SE UNIR EM MATRIMONIO",
                                    value: `${User} 💓 ${userMarry}`,
                                })
                                .setFooter({ text: `❤ União` });

                            await tableMarry.set(`user_${User.id}`, {
                                id: `${userMarry.id}`,
                                status: "married",
                            });
                            await tableMarry.set(`user_${userMarry.id}`, {
                                id: `${User.id}`,
                                status: "married",
                            });
                            await tableMarry.set(
                                `userDate_${User.id}`,
                                moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                            );
                            await tableMarry.set(
                                `userDate_${userMarry.id}`,
                                moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
                            );

                            await inter.editReply({
                                content: `${User}`,
                                embeds: [embed],
                                components: [],
                            });
                        }
                    }
                    if (i.customId === "recusar") {
                        const embed = new EmbedBuilder()
                            .setColor("FF0000")
                            .setTitle("📜 PEDIDO RECUSADO")
                            .setDescription(
                                `${User} Parece que ${userMarry} recusou seu pedido...`
                            )
                            .addFields({
                                name: "💔 PEDIDO RECUSADO",
                                value: `${User} 💔 ${userMarry}`,
                            });

                        await inter.editReply({
                            content: `${User}`,
                            embeds: [embed],
                            components: [],
                        });
                    }
                });
            }
        }
    },
};
