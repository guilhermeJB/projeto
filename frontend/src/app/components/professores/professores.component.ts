import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Professor } from '../../interfaces/professor.model';
import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  professores: Professor[];
  colunas = ['nome'];

  constructor(private linkerService: LinkerService, private router: Router) { }

  ngOnInit() {
    this.fetchProfessores();
  }

  fetchProfessores(){
    this.linkerService
        .getProfessores()
        .subscribe((data: Professor[]) => {
          this.professores = data;
          console.log("Data requested...");
          console.log(this.professores);
        });
  }

}
