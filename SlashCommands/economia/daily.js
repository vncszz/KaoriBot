const { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms")
const cooldowns = {}

module.exports = {
    name: "daily", // Coloque o nome do comando
    description: "resgate suas moedas diárias.", // Coloque a descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,

    /**
       * 
       * @param {ChatInputCommandInteraction} interaction  
       */
    run: async (client, interaction) => {
        const { user } = interaction;

        if (!cooldowns[user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("1 day")
        if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
            let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
            if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

            interaction.reply({ content: `Espere \`${time}\` para poder resgatar seu daily novamente!`, ephemeral: true }); return;
        } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

        let quantia = Math.ceil(Math.random() * 2500);
        db.add(`carteira_${interaction.user.id}`, quantia);

        const embed = new EmbedBuilder()
            .setColor(cor)
            .setDescription(`Olá ${user}, você resgatou o daily abaixo com sucesso utilize o comando \`/carteira\` para ver o seu saldo.`)
            .addFields(
                { name: '💸 Daily:', value: `${quantia}`, },
            )

        interaction.reply({ embeds: [embed], ephemeral: true });

    }
}