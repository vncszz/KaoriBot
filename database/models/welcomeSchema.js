const { model, Schema } = require('mongoose');

let welcomeSchema = new Schema({
    Guild: String,
    Channel: String,
    userID: String,
})

module.exports = model("welcome", welcomeSchema)