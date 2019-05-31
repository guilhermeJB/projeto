import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Vigias } from '../../interfaces/vigias.model';
import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-vigilancias',
  templateUrl: './vigilancias.component.html',
  styleUrls: ['./vigilancias.component.css']
})
export class VigilanciasComponent implements OnInit {

  id;
  vigias: Vigias[];
  colunas = ['exame', 'professor'];

  constructor(private linkerService: LinkerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });

    this.fetchVigias(this.id);
  }

  fetchVigias(id){
    this.linkerService
        .getVigias(id)
        .subscribe((data: Vigias[]) => {
          this.vigias = data;
          console.log(data);
        });
  }
}
