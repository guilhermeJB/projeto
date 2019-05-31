var mongoose = require('mongoose');

let exameSchema = new mongoose.Schema({
    codigo: Number,
    unCurricular: {type: mongoose.Schema.Types.ObjectId, ref:'unidadeCurricular'},
    data: Date,
    dia: String,
    horaInicio: String,
    horaFim: String,
    salas: [{type: String}]

});

const Exame = module.exports = mongoose.model('exame', exameSchema);