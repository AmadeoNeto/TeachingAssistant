import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;
  githubDuplicado: boolean = false;

  constructor(private alunoService: AlunoService) { }

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a)
      .subscribe(
        ar => {
          if (ar) {
            this.alunos.push(ar);
            this.aluno = new Aluno();
          } else {
            let error:string = this.alunoService.getError().toString().toLowerCase();
            if(error.includes("github")){
              this.githubDuplicado = true;
            } else if(error.includes("cpf")){
              this.cpfduplicado = true;
            }
          }
        },
        msg => { alert(msg.message); }
      );
  }

  removerAluno(cpf: string) : void {
    this.alunoService.delete(cpf).subscribe(
      
    );
  }

  onMove(): void {
    this.cpfduplicado = false;
    this.githubDuplicado = false;
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
      .subscribe(
        as => { this.alunos = as; },
        msg => { alert(msg.message); }
      );
  }


}