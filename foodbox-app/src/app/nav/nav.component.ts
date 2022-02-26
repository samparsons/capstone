import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cartCount:number = 0;
  authStatus:boolean = false;
  authMessage:string = 'Login';
  authUser:any=[];
  user:any=[];
  adminBool:boolean=false;
  constructor(private internal: InternalService,
              private router : Router) { 
    this.internal.cartSubject.subscribe((data)=>{
      this.cartCount = data;
    });
    this.internal.authSubject.subscribe((data)=>{
      this.authStatus = data;
    });
    this.internal.authMessage.subscribe((data)=>{
      this.authMessage = data;
    });
    this.internal.adminBool.subscribe((data)=>{
      this.adminBool = data;
    });
  }

  ngOnInit(): void {
    this.authUser = localStorage.getItem('authUser');
    if(this.authUser!=null){
      this.user = JSON.parse(this.authUser);
      this.internal.adminBool.next(this.user.adminstatus);
      this.internal.authSubject.next(true);
      this.internal.authMessage.next('Your Account');
    }
  }

  handleAccountClick(){
    if(this.authUser!=null){
      this.router.navigate(['account']);
    } else {
      this.router.navigate(['login']);
    }
  }

}
