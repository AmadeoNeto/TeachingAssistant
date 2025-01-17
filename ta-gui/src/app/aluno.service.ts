import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../../common/aluno';

@Injectable()
export class AlunoService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  private lastError = "";

  constructor(private http: HttpClient) { }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.taURL + "/aluno", aluno, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; }
         else { 
           this.lastError = res.failure.toString();
           return null; 
        } })
      );
  } 

  delete(cpf: string): Observable<string | ArrayBuffer> {
    return this.http.delete<any>(this.taURL + "/aluno/:"+cpf, { headers: this.headers })
      .pipe(
        retry(2),
      );
  } 

  getError(): string{
    let error = this.lastError
    this.lastError = "";
    return error;
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.taURL + "/aluno", JSON.stringify(aluno), { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/alunos")
      .pipe(
        retry(2)
      );
  }

}