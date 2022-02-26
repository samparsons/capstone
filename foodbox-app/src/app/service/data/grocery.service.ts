import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//I SHOULD RENAME THIS FROM GROCERY SERVICE TO MENU SERVICE, BUT I AM TOO LAZY. IF I HAVE TIME I WILL.
export class GroceryService {
  host = 'localhost';
  baseurl = 'http://'+ this.host +':8081/menu';
  
  constructor(private http:HttpClient) { }

  getGroceryAll(orderByField?:string,sortDesc?:boolean){
    let stub = '/all/' + (orderByField===undefined ? '' : '/' + orderByField ) + (sortDesc===undefined ? false : '/' + sortDesc );
    return this.http.get<any>(this.baseurl+stub)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getGroceryActive(active:boolean,orderByField?:string,sortDesc?:boolean){
    let stub =  '/np' + 
                (active===undefined ? true : '/' + active ) +
                (orderByField===undefined ? '' : '/' + orderByField + '/' + sortDesc );
    
    return this.http.get<any>(this.baseurl+stub)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getGroceryCatgegory(active:boolean,category:string,orderByField?:string,sortDesc?:boolean){
    
    let stub =  '/cat' + 
                (active===undefined ? true : '/' + active ) +
                (category===undefined ? '' : '/' + category ) + 
                (orderByField===undefined ? '' : '/' + orderByField + '/' + sortDesc);
    if(stub.indexOf('//')>0){
      stub = stub.slice(0,stub.indexOf('//'));
    }
    
    return this.http.get<any>(this.baseurl+stub)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getSingleGrocery(id:number){
    let stub = '/id/' + id;
    return this.http.get<any>(this.baseurl+stub)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addSingleGrocery(grocery:any): Observable<any> {
    return this.http.post<any>(this.baseurl, grocery, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  updateGrocery(grocery:any,id:number): Observable<void> {
    let baseurl = 'http://'+ this.host +':8081';
    let stub =  '/menu/' + id;
    if(stub.indexOf('//')>0){
      stub = stub.slice(0,stub.indexOf('//'));
    }
    return this.http.put<void>(baseurl+stub, grocery, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  getTransactionTotalsByUser(userId:number){
    let baseurl = 'http://'+ this.host +':8081';
    let stub =  '/transactionTotal/user/' + userId;
    if(stub.indexOf('//')>0){
      stub = stub.slice(0,stub.indexOf('//'));
    }
    return this.http.get<any>(baseurl+stub)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addTransactionTotal(transactionTotal:any): Observable<any> {
    let baseurl = 'http://'+ this.host +':8081';
    let stub =  '/transactionTotal';
    return this.http.post<any>(baseurl+stub, transactionTotal, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }
  
  addTransactionDetail(transactionDetail:any): Observable<any> {
    let baseurl = 'http://'+ this.host +':8081';
    let stub =  '/transactionDetail';
    return this.http.post<any>(baseurl+stub, transactionDetail, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }


  
  deleteGrocery(id:number): Observable<void> {
    return this.http.delete<void>(`${this.baseurl}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  handleError(errorResponse: HttpErrorResponse){
    let errorMessage = '';
          if (errorResponse.error instanceof ErrorEvent) {
            errorMessage = `Client Error: ${errorResponse.error.message}`;
          } else {
            errorMessage = `Server Error: ${this.getServerErrorMessage(errorResponse)}`;
          }

          return throwError(() => new Error(errorMessage));
  }

  getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 404: {
          return `Not Found: ${error.message}`;
      }
      case 403: {
          return `Access Denied: ${error.message}`;
      }
      case 500: {
          return `Internal Server Error: ${error.message}`;
      }
      default: {
          return `Unknown Server Error: ${error.message}`;
      }

    }

  }

}