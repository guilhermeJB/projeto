export interface Exame {
    codigo: String,
    unCurricular: String,
    data: String,
    dia: String,
    horaInicio: String,
    horaFim: String,
    salas: [{type: String}]
}