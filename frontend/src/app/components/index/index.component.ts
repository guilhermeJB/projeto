import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Login } from '../../interfaces/loginData.model';
import { LinkerService } from '../../services/linker.service';
import { Professor } from '../../interfaces/professor.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  id = "inserir id aqui";

  constructor(private linkerService: LinkerService, private router: Router) { }

  ngOnInit() {
  }

  vigias(){
    this.router.navigate([`vigilancias/${this.id}`]);
  }

  profs(){
    this.router.navigate([`professores`]);
  }

  exames(){
    this.router.navigate([`exames`]);
  }
}
