import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Exame } from '../../interfaces/exame.model';
import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.css']
})
export class ExamesComponent implements OnInit {

  exames: Exame[];
  colunas = ['unCurricular', 'data', 'horaInicio', 'horaFim', 'salas'];

  constructor(private linkerService: LinkerService, private router: Router) { }

  ngOnInit() {
    this.fetchProfessores();
  }

  //list exames

  fetchProfessores(){
    this.linkerService
        .getExames()
        .subscribe((data: Exame[]) => {
          this.exames = data;
          console.log("Data requested...");
          console.log(this.exames);
        });
  }

}
