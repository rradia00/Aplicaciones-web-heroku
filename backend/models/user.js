var mongoose = require('mongoose')
var Schema = mongoose.Schema
const user = new Schema({
    user: String,
    password: String
});

var usuario = mongoose.model('Users', user)
module.exports = usuario