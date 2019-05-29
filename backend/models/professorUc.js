var mongoose = require('mongoose');

let professorUCSchema = new mongoose.Schema({
    cadeira: {type: mongoose.Schema.Types.ObjectId, ref:'unidadeCurricular'},
    professor: {type: mongoose.Schema.Types.ObjectId, ref:'professores'},
    regente: Boolean
});

const Professor = module.exports = mongoose.model('professorUC', professorUCSchema);