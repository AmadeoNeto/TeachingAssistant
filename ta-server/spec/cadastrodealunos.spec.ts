import { CadastroDeAlunos } from '../cadastrodealunos';
import { Aluno } from '../../common/aluno';

describe("O cadastro de alunos", () => {
  var cadastro: CadastroDeAlunos;

  function cadastrarAluno(nome:string, cpf:string, email:string, github:string) {
    var aluno: Aluno = new Aluno();
    aluno.nome = nome;
    aluno.cpf = cpf;
    aluno.email = email;
    aluno.login_github = github;
    cadastro.cadastrar(aluno);
  }

  function expectSoUmAluno() {
    expect(cadastro.getAlunos().length).toBe(1);
    var aluno = cadastro.getAlunos()[0];
    return aluno;
  }

  beforeEach(() => cadastro = new CadastroDeAlunos())

  it("é inicialmente vazio", () => {
    expect(cadastro.getAlunos().length).toBe(0);
  })

  it("cadastra alunos corretamente", () => {
    cadastrarAluno("Mariana","683",'a@cin','a');

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
    expect(aluno.cpf).toBe("683");
    expect(aluno.email).toBe("a@cin");
    expect(aluno.login_github).toBe("a");
    expect(aluno.metas.size).toBe(0);
  })

  it("não aceita alunos com CPF duplicado", () => {
    cadastrarAluno("Mariana","683",'a@cin','a');
    cadastrarAluno("Pedro","683",'b@ufpe','b');

    var aluno = expectSoUmAluno();
    expect(aluno.nome).toBe("Mariana");
  })

  it("remove alunos corretamente" , () => {
    cadastrarAluno("Mariana","683",'a@cin','a');
    cadastrarAluno("Pedro","726",'b@ufpe','b');

    cadastro.remover("726");
    let aluno = expectSoUmAluno();
    expect(aluno.nome == "Mariana");
    expect(aluno.cpf == "683");
    expect(aluno.email == "a@cin");
    expect(aluno.login_github == "a");
  })

  it("não remove alunos com cpf não cadastrado", () => {
    cadastrarAluno("Mariana","683",'a@cin','a');

    cadastro.remover("153");
    let aluno = expectSoUmAluno();
    expect(aluno.nome == "Mariana");
    expect(aluno.cpf == "683");
    expect(aluno.email == "a@cin");
    expect(aluno.login_github == "a");
  })
})