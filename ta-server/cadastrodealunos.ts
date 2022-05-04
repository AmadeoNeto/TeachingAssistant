import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

   cadastrar(aluno: Aluno): Aluno {
     var result = null;
     if (this.naoCadastrado(aluno) && this.eAluno(aluno)) {
       result = new Aluno();
       result.copyFrom(aluno);
       this.alunos.push(result);
     }
     return result;
   }

   get_error(aluno:Aluno) : string{
     if(!this.cpfNaoCadastrado(aluno.cpf)){
       return "CPF já cadastrado!"
     }
     else if(!this.githubNaoCadastrado(aluno.login_github)){
       return "Github já cadastrado!"
     }
     else if (!this.eAluno(aluno)){
       return 'Campos faltando!'
     }
     else{
       return "Unknow Error"
     }
   }

   cpfNaoCadastrado(cpf: string): boolean {
     return !this.alunos.find(a => a.cpf == cpf);
   }

   githubNaoCadastrado(login_github: string): boolean {
     return !this.alunos.find(a => a.login_github == login_github);
   }

   naoCadastrado(aluno: Aluno): boolean{
     return this.cpfNaoCadastrado(aluno.cpf) && this.githubNaoCadastrado(aluno.login_github)
   }

   eAluno(aluno:Aluno): boolean{
     let nomeValido   = this.campoValido(aluno.nome);
     let cpfValido    = this.campoValido(aluno.cpf);
     let emailValido  = this.campoValido(aluno.email);
     let githubValido = this.campoValido(aluno.login_github);
    return nomeValido && cpfValido && emailValido && githubValido;
   }

   campoValido(campo:string|undefined): boolean{
     return campo != undefined && campo != null && campo != ''; 
   }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }

  remover(cpf:string) : Aluno{
    if(cpf[0] == ':'){
      cpf = cpf.substring(1)
    }
    for (let index = 0; index < this.alunos.length; index++) {
      let aluno = this.alunos[index];
      if(aluno.cpf == cpf){
        this.alunos.splice(index,1)
        return aluno;
      }
    }
    return null;
  }
}