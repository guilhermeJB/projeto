var mongoose = require('mongoose');

let loginSchema = new mongoose.Schema({
    username: String,
    password: String
});

const Login = module.exports = mongoose.model('login', loginSchema);