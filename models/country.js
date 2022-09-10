const mongoose = require("mongoose");

var country = mongoose.model('country', new mongoose.Schema({name: String,
    region: String,
}, {collection: 'countries'}));

module.exports = country;