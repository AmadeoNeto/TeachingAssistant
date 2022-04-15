import request = require("request-promise");
import { closeServer } from '../ta-server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de alunos vazia", () => {
    return request.get(base_url + "alunos")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra alunos", () => {
    var options:any = {method: 'POST', uri: (base_url + "aluno"), body:{name: "Mari", cpf: "962"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({failure: "O aluno não pode ser cadastrado!"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });


  it("não cadastra alunos com CPF duplicado", () => {
    var aluno1 = {"json":{"nome": "Mari", "cpf" : "965" , "login_github":"a", "email":""}};
    var aluno2 = {"json":{"nome": "Pedro", "cpf" : "965", "login_github":"b", "email":""}};
    var resposta1 = '{"nome":"Mari","cpf":"965","email":"","login_github":"a","metas":{}}';
    var resposta2 = '{"nome":"Pedro","cpf":"965","email":"","login_github":"b","metas":{}}';

    return request.post(base_url + "aluno", aluno1)
             .then(body => {
                expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
                return request.post(base_url + "aluno", aluno2)
                         .then(body => {
                            expect(body).toEqual({failure: "O aluno não pode ser cadastrado! CPF já cadastrado!"});
                            return request.get(base_url + "alunos")
                                     .then(body => {
                                        expect(body).toContain(resposta1);
                                        expect(body).not.toContain(resposta2);
                                      });
                          });
              })
              .catch(err => {
                 expect(err).toEqual(null)
              });
   })

   it("tenta remover aluno que não existe", () => {
      var options:any = {method: 'DELETE', uri: (base_url + "aluno/:683"), json: true};
      return request(options)
               .then(body =>
                  expect(body).toEqual({failure: "O aluno não pode ser removido"})
               ).catch(e =>
                  expect(e).toEqual(null)
               )
   });

   it("remove o aluno de cpf dado", () => {
      let aluno = {"json":{"nome": "Janio", "cpf" : "111" , "login_github":"janio", "email":""}};
      let deleteOptions:any = {method: 'DELETE', uri: (base_url + "aluno/:111"), json: true,};

      return request.post(base_url + "aluno", aluno)
               .then(body => {
                  expect(body).toEqual({success: "O aluno foi cadastrado com sucesso"});
                  
                  return request.delete(deleteOptions)
                        .then(body=> {
                           expect(body).toEqual({"success": "O aluno foi removido com sucesso"})
                        })
               });
      });
});