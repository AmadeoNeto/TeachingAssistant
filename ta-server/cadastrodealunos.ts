import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
   alunos: Aluno[] = [];

   cadastrar(aluno: Aluno): Aluno {
     var result = null;
     if (this.cpfNaoCadastrado(aluno.cpf) && this.githubNaoCadastrado(aluno.login_github)) {
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

    atualizar(aluno: Aluno): Aluno {
     var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
     if (result) result.copyFrom(aluno);
     return result;
   }

    getAlunos(): Aluno[] {
     return this.alunos;
   }

   remover(cpf:string) : Aluno{
     cpf = cpf.substring(1)
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