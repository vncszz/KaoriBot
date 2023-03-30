const { connect } = require("mongoose");
const mongoose = require('mongoose');
const chalk = require("chalk");

module.exports = {
    start() {
        mongoose.set('strictQuery', false);
        try {
            connect(process.env.mongourl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log(chalk.hex(`56F510`).bold(`[MongoDB] - Database Conectada.`));
        } catch (err) {
            if (err) return console.log(`🚨 | [MongoDB]:`, err);
        }
    },
};