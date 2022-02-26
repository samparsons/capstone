import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/data/user.service';
import { InternalService } from '../service/data/internal.service';



@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;
  errorBool:boolean=false;
  errorMessage = '';
  authUser:any=[];
  user:any =[];
  loginHelpMessage:string='';
  authStatus:boolean=false;
  cart:any=[];


  constructor(
    private router : Router,
    private api:UserService,
    private internal:InternalService
  ) { 
    this.internal.authSubject.subscribe((data)=>{
      this.authStatus = data;
    });
    
  }

  ngOnInit(): void {
    
    this.authUser = localStorage.getItem('authUser');
    if(this.authUser!==null){
      this.user = JSON.parse(this.authUser);
      this.router.navigate(['account']);
    }
    this.cart = localStorage.getItem('localCart');
    if(this.authUser===null&&this.cart!==null){
      this.errorMessage = 'You must be logged in before you can checkout!';
      this.errorBool = true;
    }
  }

  handleLogin(){
    this.api.getUserAuth(this.username,this.password)
    .subscribe(res=>{
        if(res.id === null){
          this.invalidLogin = true;
          this.internal.authSubject.next(false);
        } else {
          this.authUser = res;
          localStorage.setItem('authUser',JSON.stringify(this.authUser));
          this.internal.authMessage.next('Your Account');
          this.internal.adminBool.next(this.authUser.adminstatus);
          this.internal.authSubject.next(true);
          this.router.navigate(['account']);
        }
    });
    
  }
}
