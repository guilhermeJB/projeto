import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material'; 

import { Login } from '../../interfaces/loginData.model';
import { LinkerService } from '../../services/linker.service';
import { Professor } from '../../interfaces/professor.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String;
  password:String;
  loginDetails: any = {};

  constructor(private linkerService: LinkerService, private router: Router, private route: ActivatedRoute) {

   }

   ngOnInit(){

   }

  inputUser(event){
    this.username = event.target.value;
  }

  inputPw(event){
    this.password = event.target.value;
  }

  login(e){
    
    let result = true;
    this.linkerService.login(this.username).subscribe(res => {
      this.loginDetails = res;
    });

    console.log(this.loginDetails);

    if(result){
      //logado
      this.direciona(true);
      ;
    }else{
      //incorrect
      this.direciona(false);
    }
  }

  addAdmin(){
    const login = {
      username: 'admin',
      password: 'admin'
    }
    return this.linkerService.addAdmin(login);
  }

  direciona(type){
    if(type)
      this.router.navigate([`/index`]);
    else
      this.router.navigate([`/login`]);
  }

}
