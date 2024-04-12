const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
    table: String,
    count: Number
})

const counter = mongoose.model('counter_collection', counterSchema);
module.exports = counter;
