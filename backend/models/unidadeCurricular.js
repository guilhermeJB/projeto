var mongoose = require('mongoose');

let CadeiraSchema = new mongoose.Schema({
    codigo: Number,
    nome: String
});

const Cadeira = module.exports = mongoose.model('unidadeCurricular', CadeiraSchema);