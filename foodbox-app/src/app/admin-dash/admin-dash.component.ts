import { UserService } from './../service/data/user.service';
import { Component, OnInit } from '@angular/core';
import { GroceryService } from '../service/data/grocery.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
  
  editId:any;
  editName:any;
  editDescription:any;
  editCategoy:any;
  editActive:any;
  editPrice:any;
  editImgurl:any;

  localProducts:any=[];
  localUsers:any=[];
  authUser:any=[];
  closeResult: string = '';
  groceryEdit: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    active: new FormControl(''),
    price: new FormControl(''),
    imgurl: new FormControl('')
  });

  constructor(
    private apiGrocery:GroceryService,
    private apiUser:UserService,
    private router : Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authUser = localStorage.getItem('authUser');
    this.user = JSON.parse(this.authUser);
    if(this.user===null||this.user.adminstatus===false){
      this.router.navigate(['home']);
    }
    this.getGroceryAll();
    this.getUser();
  }

  getGroceryAll(){
    setTimeout(() => {
      this.apiGrocery.getGroceryAll()
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
  singleEdit(id:any){
    //this.apiGrocery.updateGrocery()

  }
  singleDelete(id:any,control:string){
    if(control==='g'){
      this.apiGrocery.deleteGrocery(id)
      .subscribe(
        (data: any)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
        this.getGroceryAll();
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

  onSubmitAdd(groceryEdit:any): void {
    console.log(groceryEdit.value);
    groceryEdit.value.active = (groceryEdit.value.active==="true" ? true : false);
    this.apiGrocery.addSingleGrocery(groceryEdit.value)
      .subscribe(
        (data: any)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
    this.getGroceryAll();
    this.reload();
  }

  onSubmitEdit(groceryEdit:any): void {
    console.log(groceryEdit.value);
    groceryEdit.value.active = (groceryEdit.value.active==="true" ? true : false);
    this.apiGrocery.updateGrocery(groceryEdit.value,this.editId)
      .subscribe(
        (data: any)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
    this.getGroceryAll();
    this.reload();
  }

  open(content:any,id:number) {
    this.editId = id;
    this.apiGrocery.getSingleGrocery(id)
      .subscribe(
        (data: any)=>{
          console.log(data);
          this.editName = data.name;
          this.editDescription = data.description;
          this.editCategoy = data.category;
          this.editActive = data.active;
          this.editPrice = data.price;
          this.editImgurl = data.imgurl;
        },
        (error: any) => console.log(error));
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 

  open2(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  } 
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

