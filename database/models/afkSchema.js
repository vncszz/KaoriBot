const { model, Schema } = require('mongoose');

let afkSchema = new Schema({
    Guild: String,
    User: String,
    Reason: String,
    IsAfk: Boolean,
    LastSeen: Date,
})

module.exports = model("afk", afkSchema);