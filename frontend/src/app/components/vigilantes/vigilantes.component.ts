import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Vigias } from '../../interfaces/vigias.model';
import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-vigilantes',
  templateUrl: './vigilantes.component.html',
  styleUrls: ['./vigilantes.component.css']
})
export class VigilantesComponent implements OnInit {

  professor:String;
  vigias: Vigias[];
  colunas = ['professor', 'disciplina', 'data', 'hInicio', 'hFim', 'sala'];

  constructor(private linkerService: LinkerService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.professor = params['id'] //log the value of id
    });
    this.fetchVigias(this.professor);
  }

  fetchVigias(id:String){
    this.linkerService
        .getVigias(id)
        .subscribe((data: Vigias[]) => {
          this.vigias = data;
          console.log("Data requested...");
          console.log(this.vigias);
        });
  }

}
