import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Login } from '../../interfaces/loginData.model';
import { LinkerService } from '../../services/linker.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;
  theLg:any;

  constructor(private linkerService: LinkerService, private router: Router) { }

  ngOnInit() {
  }

  inputUser(event){
    this.username = event.target.value;
  }

  inputPw(event){
    this.password = event.target.value;
  }

  async login(){
    let result = false;
    let login;
    await this.linkerService.login(this.username).subscribe(res => {
      this.theLg = res;

      console.log(this.username == this.theLg[0].username);
      console.log(typeof this.username);
      console.log(typeof this.theLg[0].username);
          result =( (this.username == this.theLg[0].username) && (this.password == this.theLg[0].password) );   //false nao sei pq, resolver
    });
    console.log(result);
    if(result){
      //logado
      this.router.navigate['/index'];
      ;
    }else{
      //incorrect
      this.router.navigate['/login'];
    }
  }

  addAdmin(){
    const login = {
      username: 'admin',
      password: 'admin'
    }

    return this.linkerService.addAdmin(login);
  }

}
