var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var xlsx = require('xlsx');
const bb = require('busboy');
const fs = require('fs');
const moment = require('moment')


var Professor = require('./models/professor');
var UnidadeCurricular = require('./models/unidadeCurricular');
var ProfessorUC = require('./models/professorUc');
var Login = require('./models/login');
var Vigias = require('./models/vigilancias');
var Exame = require('./models/exame');

const app = express();
const router = express.Router();

const PORT = 3003;


app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


mongoose.connect('mongodb://psi003:psi003@localhost:27017/psi003?retryWrites=true&authSource=psi003',  {useNewUrlParser: true}, (err) => {  //mongodb://psi003:psi003@localhost:27017/psi003?retryWrites=true&authSource=psi003
    if(err)
        console.log(err);
    else
        console.log('Connected.');
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});


// Todos os gets 
router.route('/professores').get((req, res) => {
    Professor.find((err, profs) => {
        if (err)
            console.log(err);
        else
            res.json(profs);
    });
});

router.route('/unCurriculares').get((req, res) => {
    UnidadeCurricular.find((err, ucs) => {
        if (err)
            console.log(err);
        else
            res.json(ucs);
    });
});

router.route('/exames').get((req, res) => {
    Exame.find((err, ex) => {
        if (err)
            console.log(err);
        else
            res.json(ex);
    });
});

router.route('/exames/:id').get((req, res) => {
    Exame.find({_id: req.params.id}, (err, ex) => {
        if(err)
            console.log(err);
        else
            res.json(ex)
    }).exec();
});

router.route('/getVigias/:id').get((req, res) => {
    Vigias.find({professor: req.params.id}, (err, vg) => {
        if(err)
            console.log(err);
        else
            res.json(vg)
    }).exec();
});






// Todos os adds
router.route('/professores/add').post(async(req, res)=> {
    let prof = new Professor(req.body);

    var professor = await getProfessorByName(prof.nome);

    if(!cadeira.length){
        prof.save()
            .then(prof => {
                res.status(200).json({'prof': 'Added sucessfully'});
            })
            .catch(err => {
                res.status(400).send('Falha a criar um novo professor');
            });
    }
    res.status(400).send('Falha a criar uma nova unidade curricular');
});

router.route('/unCurriculares/add').post(async(req, res)=> {
    let unic = new UnidadeCurricular(req.body);

    var cadeira = await getCadeiraByCodigo(unic.codigo);

    if(!cadeira.length){
        unic.save()
        .then(unic => {
            res.status(200).json({'unic': 'Added sucessfully'});
        })
        .catch(err => {
            res.status(400).send('Falha a criar uma nova unidade curricular');
        });
    }
    res.status(400).send('Falha a criar uma nova unidade curricular');
    
});

router.route('/login/:username').get(async(req, res) => {
    var login = await Login.find({username: req.params.username}, (err, login) => {
        console.log(login);
        if (err)
            res.status(400).send("Username nao existente.");
        else
            res.json(login);        
    }).exec();
});

router.route('/login/add').post((req,res) => {
    
    new Login(req.body).save().then(log => {
        res.status(200).json({'log': 'Added'});
    })
    .catch(err => {
        res.status(400).send('Falha a criar login');
    });
});

router.route('/criaCalendario').get(async (req,res) => {

    
    let cadeiraExame = await Exame.find({}).exec();

    cadeiraExame.forEach(async (data)=> {
        
        var chair = await getCadeiraByCodigo(data.codigo);
        
        var nomeFBD = await ProfessorUC.find({cadeira: chair[0]._id}).exec();

        var prof = await Professor.findById(nomeFBD[0].professor._id).exec();

        console.log(prof);
        var vigia = await Vigias.find({professor: prof._id}).exec();
        var vigiaExama = await Vigias.find({exame: data._id}).exec();

        console.log(vigia);
        
        if (!vigia.length) {
            //ainda nao tem vigia
            new Vigias({
                exame: data._id,
                professor: prof._id
            }).save();
        }
    });

    res.status(200).json('Success');
});

router.route('/professores/add').post((req,res) => {
    
    new Login(req.body).save().then(log => {
        res.status(200).json({'log': 'Added'});
    })
    .catch(err => {
        res.status(400).send('Falha a criar login');
    });
});





// Todos os edits





//
router.route('/uploadDocentes').post((req, res) => {

    var busboy = new bb({ headers: req.headers });
    req.pipe(busboy);
    busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        let path = 'uploads/' + filename;
        console.log(path);
        let nome = filename.split(".")[0];

        let writeStream = fs.createWriteStream(path);

        file.on('data', function (data) {
            writeStream.write(data);
        });

        file.on('end', function (data) {
            writeStream.end();
            if(nome.match('servicoDocente')){
                bdData(path,true);
            } else {
                bdData(path, false);
            }
        });

        res.status(200).json("success");
    });
});


function bdData(path, bool){
    var dir = __dirname.concat('/');
    var finalPath = dir.concat(path);

    setTimeout(function() {

        const workbook = xlsx.readFile(path, {cellDates: true});

        workbook.SheetNames.forEach( async(name, l) => { 
            var sheet = workbook.Sheets[name];
            var xlData = xlsx.utils.sheet_to_json(sheet);
            
            console.log('Reading xlData...');
                for(var i = 0; i < xlData.length; i++){

                    var linha = xlData[i];
                    if(bool){
                        var prof = await addData(true, linha);
                        var disciplina = await addData(false, linha);
                        

                        if(linha.REGENTE != undefined){
                            new ProfessorUC({
                                cadeira: disciplina._id,
                                professor: prof._id,
                                regente: true
                            }).save();
                        }else {
                            new ProfessorUC({
                                cadeira: disciplina._id,
                                professor: prof._id,
                                regente: false
                            }).save();
                        }
                    } else {
                        await addExames(linha);
                    }
                }
        });
    }, 500);
}

//type : boolean (0 prof, 1 cadeira)
async function addData(type, linha){

    if(type){
        let professor = linha.SERVICO_DOCENTE;
        let tpProfessor = linha.TIPO_DE_PROFESSOR;

        var fromBD = await getProfessorByName(professor);

            if(!fromBD.length){
                return new Professor({
                    nome: professor,
                    cargo: tpProfessor
                }).save();
            }
        return fromBD;

    }else {
        var codigo_uc = linha.CODIGO_UC;
        var uc = linha.UNIDADE_CURRICULAR;

        var fromBD = await getCadeiraByCodigo(codigo_uc);

        if(!fromBD.length){
            return new UnidadeCurricular({
                codigo: codigo_uc,
                nome: uc
            }).save();
        }
        return fromBD;
    }
}

async function addExames(linha){

    var date = new Date(linha.Data);
    var horaIn = getHora(linha.Hora_Inicio);
    var horaOut = getHora(linha.Hora_Fim);

    var exameCurr = await Exame.find({codigo: linha.Codigo, data: date, horaInicio: horaIn,
        horaFim: horaOut}).exec();

    if(!exameCurr.length){
        var disciplina = await getCadeiraByCodigo(linha.Codigo);
        var sala = addSalas(linha.Sala);


        if(!disciplina.length){
            return;
        }

        return new Exame({
            codigo: linha.Codigo,
            unCurricular: disciplina._id,
            data: date,
            dia: linha.Dia,
            horaInicio: horaIn,
            horaFim: horaOut,
            salas: sala
        }).save();
    }
}

function addSalas(salas){
    var result = [];
    salas.split('|').forEach((entry) => {
        result.push(entry.split(' ').join(''));
    });
    return result;
}

function getHora(hora) {
    var momentDate = moment(hora);
    
    var hour = momentDate.hours();
    var minutes = momentDate.minutes();
    var seconds = momentDate.seconds();
    
    // or you can use `.format`:
    return momentDate.format("hh:mm:ss");
}

async function getProfessorByName(name) {
    //console.log("Finding Professor...");
    let result = await Professor.find({nome: name}).exec();
    return result;
}

async function getCadeiraByCodigo(code) {
    //console.log("Finding Unidade Curricular...");        
    let result =  await UnidadeCurricular.find({codigo: code}).exec();
    return result;
}


app.use('/', router);

app.listen(PORT, () => console.log("Express server running on port 3003"));