import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../service/data/user.service';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;
  errorMessage = '';


  constructor(
    private router : Router,
    private api:UserService
  ) { }

  ngOnInit(): void {
  }

  handleLogin(){
    this.api.getUserAuth(this.username,this.password)
    .subscribe(res=>{
        if(res.id === null){
          this.invalidLogin = true;
        } else {
          this.router.navigate(['admin-dash',res.id]);
        }
    });
  }
}
