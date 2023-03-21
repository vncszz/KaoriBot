const chalk = require("chalk");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {

        const atividade = [{ name: `.gg/animesbrasil`, type: 0 }, { name: `Anime's Zero™`, type: 3 }];
        const status = [`online`];

        let random1 = 0;

        setInterval(() => {
            if (random1 >= atividade.length) random1 = 0

            client.user.setActivity(atividade[random1])

            random1++
        }, 10000)

        let random2 = 0;

        setInterval(() => {
            if (random2 >= atividade.length) random2 = 0

            client.user.setStatus(status[random2])

            random2++
        }, 25000)

        console.log(chalk.hex(`4169E1`).bold(`[Bot-Status] > Estou online como: ${client.user.username}`))
    }
}
