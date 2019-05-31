var mongoose = require('mongoose');

let vigiaSchema = new mongoose.Schema({
    exame: {type: mongoose.Schema.Types.ObjectId, ref:'exame'},
    professores: {type: mongoose.Schema.Types.ObjectId, ref:'professores'}
});

const Vigia = module.exports = mongoose.model('vigias', vigiaSchema);