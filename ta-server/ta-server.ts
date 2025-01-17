import express = require('express');

import {Aluno} from '../common/aluno';
import {CadastroDeAlunos} from './cadastrodealunos';

var taserver = express();

var cadastro: CadastroDeAlunos = new CadastroDeAlunos();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
taserver.use(allowCrossDomain);

taserver.use(express.json());


taserver.get('/alunos', function (req: express.Request, res: express.Response) {
    res.send(JSON.stringify(cadastro.getAlunos()));
})

taserver.post('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: Aluno = <Aluno> req.body; //verificar se é mesmo Aluno!
    var response = cadastro.cadastrar(aluno);
    if (response) {
      res.send({"success": "O aluno foi cadastrado com sucesso"});
    } else {
      let error = cadastro.get_error(aluno);
      res.send({"failure": "O aluno não pode ser cadastrado! " + error});
    }
})

taserver.put('/aluno', function (req: express.Request, res: express.Response) {
    var aluno: Aluno = <Aluno> req.body;
    aluno = cadastro.atualizar(aluno);
    if (aluno) {
      res.send({"success": "O aluno foi atualizado com sucesso"});
    } else {
      res.send({"failure": "O aluno não pode ser atualizado"});
    }
})

taserver.delete('/aluno/:cpf',  function (req: express.Request, res: express.Response) {
    let cpf: string = <string> req.params.cpf;
    let result = cadastro.remover(cpf);

    if(result){
      res.send({"success": "O aluno foi removido com sucesso"});
    } else {
      res.send({"failure": "O aluno não pode ser removido"});
    }
})
var server = taserver.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

function closeServer(): void {
  server.close();
}

export { server, closeServer }
