const mongoose = require('mongoose')


const Schema = mongoose.Schema
const passwordSchema = new mongoose.Schema({
    site: String,    // adjust fields to match your data
    username: String,
    password: String,
    id : String,
    user_id : String
});

module.exports = mongoose.model('Password', passwordSchema)