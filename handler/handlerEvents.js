function loadEvents(client) {
    const fs = require("fs");
    //const colors = require("colors");

    const folders = fs.readdirSync("./Eventos");

    for (const folder of folders) {
        const files = fs
            .readdirSync(`./Eventos/${folder}`)
            .filter((file) => file.endsWith(".js"));

        for (const file of files) {
            const event = require(`../Eventos/${folder}/${file}`);
            if (event.rest) {
                if (event.once)
                    client.rest.once(event.name, (...args) =>
                        event.execute(...args, client)
                    );
                else
                    client.rest.on(event.name, (...args) =>
                        event.execute(...args, client)
                    );
            } else {
                if (event.once)
                    client.once(event.name, (...args) => event.execute(...args, client));
                else client.on(event.name, (...args) => event.execute(...args, client));
            }
            console.log(("=> ") + ("Evento ") + (event.name) + (" Carregado com sucesso"));
        }
    }
}

module.exports = { loadEvents };