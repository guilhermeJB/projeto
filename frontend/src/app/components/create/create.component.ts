import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fileToUpload: File = null;

  constructor(private linkerService: LinkerService, private router: Router) { }

  ngOnInit() {
  }

  onFileSelected(file){    
    this.fileToUpload = <File> file.target.files[0];
  }

  onUpload(){
    const fd = new FormData();
    fd.append('file', this.fileToUpload, this.fileToUpload.name);
    
    this.linkerService.uploadFile(fd);
  }

  criaCalendario(){
    this.linkerService.criaCalendario();

  }
}
