const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const ms = require("ms")
const cooldowns = {}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("work")
        .setDescription("Trabalhe pra ganhar dinheiro.")
        .addStringOption((option) => option
            .setName("trabalhos")
            .setDescription("escolha um emprego")
            .setRequired(true)
            .addChoices(
                {
                    name: "Feiticeiro",
                    value: "JobFeiticeiro",
                },
                {
                    name: "Alquimista",
                    value: "jobAlquimista",
                },
                {
                    name: "Aventureiro",
                    value: "jobAventureiro",
                },
                {
                    name: "Cozinheiro",
                    value: "jobCozinheiro",
                },
                {
                    name: "Lenhador",
                    value: "jobLenhador",
                },
                {
                    name: "Mercenário",
                    value: "jobMercenário",
                },
                {
                    name: "Ferreiro",
                    value: "jobFerreiro",
                },
            )
        ),

    async execute(interaction) {

        const { user } = interaction.user.id;

        let trabalhar = interaction.options.getString('trabalhos');

        if (trabalhar === 'JobFeiticeiro') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('🧙‍♂️ Feiticeiro')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091449980545404998/Personagens-de-Animes-Satoru-Gojo.png')
                .setDescription(`Você Acabou de preparar algumas poções, elixires e encantamentos!\nUma bruxa comprou de você e lhe pagou \`${quantia}\` Az Coins 🪙`)
                .setColor('DarkPurple')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobAlquimista') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('🧪 Alquimista')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091450858543251456/legiao_2s3NHxRWDe0M.png')
                .setDescription(`Você trabalhou dia e noite em seu laboratório, experimentando diferentes combinações de ingredientes na busca pela fórmula perfeita.\nUm cliente comprou seu estoque por \`${quantia}\` Az Coins 🪙`)
                .setColor('#D53030')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobAventureiro') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('🗡️🛡️🐉 Aventureiro')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091452092734001295/latest.png')
                .setDescription(`Você acaba de iniciar uma nova jornada!\nE ao entrar em uma dungeon encontrou \`${quantia}\` Az Coins 🪙`)
                .setColor('White')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobCozinheiro') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('👨‍🍳 Cozinheiro')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091453411435741314/os-10-melhores-animes-de-culinaria-de-todos-os-tempos.png')
                .setDescription(`Um cliente amou sua nova receita e lhe deu uma gorjeta de \`${quantia}\` Az Coins 🪙`)
                .setColor('#F4691F')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobLenhador') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('🪚 Lenhador')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091454017328136262/chainsaw-man-season-1-review_tqb1.png')
                .setDescription(`Você trabalhou como lenhador e recebeu \`${quantia}\` Az Coins 🪙`)
                .setColor('DarkRed')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobMercenário') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('🗡️ Mercenário')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091454847716429864/cyberpunk-mercenarios-730x365.png')
                .setDescription(`Você e sua gang eliminou uns inimigos e como recompensa ganharam \`${quantia}\` Az Coins 🪙`)
                .setColor('#F8F243')

            interaction.reply({ embeds: [embed] })

        }
        if (trabalhar === 'jobFerreiro') {

            if (!cooldowns[interaction.user.id]) cooldowns[interaction.user.id] = { lastCmd: null }; let ultimoCmd = cooldowns[interaction.user.id].lastCmd;
            let timeout = ms("1h")
            if (ultimoCmd !== null && timeout - (Date.now() - ultimoCmd) > 0) {
                let time = ms(timeout - (Date.now() - ultimoCmd)); let resta = [time.seconds, 'segundos'];
                if (resta[0] == 0) resta = ['alguns', 'millisegundos']; if (resta[0] == 1) resta = [time.seconds, 'segundo'];

                interaction.reply({ content: `Espere \`${time}\` para poder trabalhar novamente!`, ephemeral: true }); return;
            } else { cooldowns[interaction.user.id].lastCmd = Date.now() };

            let quantia = Math.ceil(Math.random() * 5000);
            db.add(`carteira_${interaction.user.id}`, quantia);

            const embed = new EmbedBuilder()
                .setTitle('⚔️ Ferreiro')
                .setImage('https://cdn.discordapp.com/attachments/1089347666430930994/1091455634823716945/demon_slayer_kimetsu_no_yaiba_to_the_swordsmith_village_brasil__2sy5z2qg-1210x544.png')
                .setDescription(`Você consertou a espada de uma espadachim e como recompensa ganhou \`${quantia}\` Az Coins 🪙`)
                .setColor('#22A028')

            interaction.reply({ embeds: [embed] })

        }

    }
}

