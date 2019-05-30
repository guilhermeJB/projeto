var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var xlsx = require('xlsx');
const bb = require('busboy');
const fs = require('fs');


var Professor = require('./models/professor');
var UnidadeCurricular = require('./models/unidadeCurricular');
var ProfessorUC = require('./models/professorUc');
var Login = require('./models/login');

const app = express();
const router = express.Router();

const PORT = 3003;


app.use(cors());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/teste',  {useNewUrlParser: true}, (err) => {  //mongodb://psi003:psi003@localhost:27017/psi003?retryWrites=true&authSource=psi003
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
        if (err)
            res.status(400).send("Username nao existente.");
        else
            res.status(200).json(login);        
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

        const workbook = xlsx.readFile(path);

        workbook.SheetNames.forEach( async(name, l) => { 
            var sheet = workbook.Sheets[name];
            var xlData = xlsx.utils.sheet_to_json(sheet);
            
            console.log('Reading xlData...');
                for(var i = 0; i < xlData.length; i++){

                    var linha = xlData[i];
                    if(bool){
                        await addData(true, linha);
                        await addData(false, linha);
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

        //console.log('Tentar adicionar Professor...');
        let professor = linha.SERVICO_DOCENTE;
        let tpProfessor = linha.TIPO_DE_PROFESSOR;

        var fromBD = await getProfessorByName(professor);
            
            //console.log('Inside function....');

            if(!fromBD.length){
                return new Professor({
                    nome: professor,
                    cargo: tpProfessor
                }).save()
                  .then(prof => {
                    res.status(200).json({'prof': 'Added sucessfully'});
                })
                .catch(err => {
                    res.status(400).send('Falha a criar um novo professor');
                });;
            }

    }else {
        //console.log('Tentar adicionar Professor...');
        var codigo_uc = linha.CODIGO_UC;
        var uc = linha.UNIDADE_CURRICULAR;

        //console.log(uc);

        var fromBD = await getCadeiraByCodigo(codigo_uc);

        if(!fromBD.length){
            return new UnidadeCurricular({
                codigo: codigo_uc,
                nome: uc
            }).save()
              .then(unic => {
                res.status(200).json({'unic': 'Added sucessfully'});
              })
              .catch(err => {
                res.status(400).send('Falha a criar uma nova unidade curricular');
              });;
        }
    }
}

async function addExames(){
    console.log("here");
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