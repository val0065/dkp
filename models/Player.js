const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const PlayerSchema = new Schema({
    name: {
        type: String
    },
    classType: {
        type: String
    },
    net: {
        type: Number
    },
    total: {
        type: Number
    },
    spent: {
        type: Number
    }
});

module.exports = Player = mongoose.model('player', PlayerSchema);