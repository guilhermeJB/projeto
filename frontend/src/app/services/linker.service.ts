import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LinkerService {

  uri = 'http://localhost:3003';

  constructor(private http: HttpClient) { }

  getProfessores(){
    return this.http.get(`${this.uri}/professores`);
  }

  addProfessor(professor){
    return this.http.post(`${this.uri}/professores/add`, professor).subscribe((res) => {
    });
  }

  addUniCurricular(unCurricular){
    return this.http.post(`${this.uri}/unCurriculares/add`, unCurricular).subscribe((res) => {
    });
  }

  uploadFile(file){
    return this.http.post(`${this.uri}/uploadDocentes`, file).subscribe((res) => {
    });
  }

  login(data){
    return this.http.get(`${this.uri}/login/${data}`);
  }

  addAdmin(login){
    return this.http.post(`${this.uri}/login/add`, login).subscribe((res) => {
    });
  }
}
