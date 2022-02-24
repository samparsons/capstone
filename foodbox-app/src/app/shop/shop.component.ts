import { GroceryService } from '../service/data/grocery.service';
import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public groceryList : any;
  // arrays
  itemsCart:any = [];
  cartValue:any = [];
  // strings
  grocery : string = '';
  search : string = '';
  category : string = '';
  orderByField : string = '';
  nPselection:string = ''
  sortPriceIconAsc:string = 'assets/img/sort-numeric-down.svg';
  sortPriceIconDesc:string = 'assets/img/sort-numeric-down-alt.svg';
  sortByPrice:string = '';
  sortNameIconAsc:string = 'assets/img/sort-alpha-down.svg';
  sortNameIconDesc:string = 'assets/img/sort-alpha-down-alt.svg';
  sortByName:string = '';
  // bools

  active:boolean = true;
  sortNameBool:boolean = false;
  sortPriceBool:boolean = false;

  constructor(
    private api:GroceryService,
    private internal:InternalService
  ) { }
  
  
  ngOnInit(): void {
    this.api.getGroceryActive(true)
    .subscribe(res=>{
      this.groceryList = res;
      for(let grocery of this.groceryList){
        grocery['qty'] = 1;
        grocery['subtotal'] = grocery.price;
      }
    })
    this.sortByName = this.sortNameIconAsc;
    this.sortByPrice = this.sortPriceIconAsc;
  }

  onCategorySelected(category:string){
    this.category = category;
  }

  onNPSelected(nPselection:string){
    this.nPselection = nPselection;
  }

  sortbyName(){
    if(this.sortNameBool){
      this.sortByName = this.sortNameIconAsc;
      this.sortNameBool = !this.sortNameBool;
      
    } else {
      this.sortByName = this.sortNameIconDesc;
      this.sortNameBool = !this.sortNameBool;
    }
  }

  sortbyPrice(){
    if(this.sortPriceBool){
      this.sortByPrice = this.sortPriceIconAsc;
      this.sortPriceBool = !this.sortPriceBool;
      
    } else {
      this.sortByPrice = this.sortPriceIconDesc;
      this.sortPriceBool = !this.sortPriceBool;
    }
  }

  apply(){
    if(this.nPselection===''&&this.category===''){
      console.log('no options selected');
    } else if (this.nPselection!==''&&this.category==='') {
      let sortBool:boolean = false;
      if(this.nPselection==='name'){
        sortBool=this.sortNameBool;
      } else if (this.nPselection==='price'){
        sortBool=this.sortPriceBool;
      } else {
        sortBool=false;
      }
      this.api.getGroceryActive(true,this.nPselection,sortBool)
      .subscribe(res=>{
        this.groceryList = res;
        for(let grocery of this.groceryList){
          grocery['qty'] = 1;
          grocery['subtotal'] = grocery.price;
        }
      })
    } else if (this.category!=='') {
      let sortBool:boolean = true;
      if(this.nPselection==='name'){
        sortBool=this.sortNameBool;
      } else if (this.nPselection==='price'){
        sortBool=this.sortPriceBool;
      }


      this.api.getGroceryCatgegory(true,this.category,this.nPselection,sortBool)
      .subscribe(res=>{
        this.groceryList = res;
        for(let grocery of this.groceryList){
          grocery['qty'] = 1;
          grocery['subtotal'] = grocery.price;
        }
      })
    }
    
  }

 

  inc(grocery:any){
    grocery.qty++;
    grocery.subtotal = grocery.qty*grocery.price;
    grocery.subtotal = Number.parseFloat(grocery.subtotal).toFixed(2);
    return grocery.qty
  }

  dec(grocery:any){
    if(grocery.qty>0){
      grocery.qty--;
      grocery.subtotal = grocery.qty*grocery.price;
      grocery.subtotal = Number.parseFloat(grocery.subtotal).toFixed(2);
    } else {
      grocery.qty = 0;
      grocery.subtotal = 0; 
    }
    return grocery.qty;
  }

  addCart(grocery:any){
    let cartDataNull = localStorage.getItem('localCart');
    if(cartDataNull === null){
      let storeDataGet:any = [];
      storeDataGet.push(grocery);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    } else {
      var id = grocery.id;
      let index:number = -1;
      this.itemsCart = JSON.parse(cartDataNull);
      for(let i=0;i<this.itemsCart.length;i++){
        if(parseInt(id) === parseInt(this.itemsCart[i].id)){
          this.itemsCart[i].qty = grocery.qty;
          this.itemsCart[i].subtotal = grocery.subtotal;
          index = i;
          break;
        }
      }
      if(index == -1){
        this.itemsCart.push(grocery)
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      } else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumber:number=0;
  cartNumberFunc(){
    this.cartValue = localStorage.getItem('localCart');
    if(this.cartValue === null){
      this.cartNumber = 0;
    } else {
      this.cartValue = JSON.parse(this.cartValue);
      if(this.cartValue === null){
        this.cartNumber = 0;
      } else {
        this.cartNumber=0;
        for(let cartItem of this.cartValue){
          this.cartNumber += cartItem.qty;
        }
      }
    }
    this.internal.cartSubject.next(this.cartNumber);
  }

}
