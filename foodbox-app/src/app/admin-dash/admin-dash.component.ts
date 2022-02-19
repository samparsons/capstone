import { InternalService } from './../service/data/internal.service';
import { UserService } from './../service/data/user.service';
import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../service/data/grocery.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.css']
})
export class AdminDashComponent implements OnInit {
  public groceryList : any;
  public userList : any;
  public user : any;
  showUsers:boolean=false;
  showGrocery:boolean=false;
  id:any;
  localProducts:any=[];
  localUsers:any=[];

  constructor(
    private apiGrocery:GroceryService,
    private apiUser:UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getGrocery();
    this.getUser();
    this.apiUser.getUser(this.id)
    .subscribe(res=>{
      this.user = res;
    });
  }

  getGrocery(){
    setTimeout(() => {
      this.apiGrocery.getGrocery()
    .subscribe(res=>{
      this.groceryList = res;
    });
    }, 150);
  }

  getUser(){
    setTimeout(() => {
      this.apiUser.getUsers()
          .subscribe(res=>{
            this.userList = res;
      });
    }, 150);
  }

  singleDelete(id:any,control:string){
    if(control==='g'){
      this.apiGrocery.deleteGrocery(id)
      .subscribe(
        (data: any)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
        this.getGrocery();
        this.reload();
    }
    if(control==='u'){
      this.apiUser.deleteUser(id)
      .subscribe(
        (data: any)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
      this.getUser();
      this.reload();
    }
  }

  
  reload(){
    localStorage.setItem('localProducts',JSON.stringify(this.groceryList));
    localStorage.setItem('localUsers',JSON.stringify(this.userList));
  }

  toggle(control:string){
    if(control==='g'){
      if(!this.showGrocery){
        this.showGrocery = !this.showGrocery;
        this.showUsers = !this.showGrocery;
        this.ngOnInit();
        this.reload();
      } else {
        this.ngOnInit();
        this.reload();
      }
    }
    if(control==='u'){
      this.showUsers = !this.showUsers;
      this.showGrocery = !this.showUsers;
      this.ngOnInit();
      this.reload();
    }
    if(control==='hideall'){
      this.showUsers = false;
      this.showGrocery = false;
    }
  }

}
