import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//I SHOULD RENAME THIS FROM GROCERY SERVICE TO MENU SERVICE, BUT I AM TOO LAZY. IF I HAVE TIME I WILL.
export class GroceryService {
  baseurl = 'http://3.86.200.81:8081/menu';

  constructor(private http:HttpClient) { }

  getGrocery(){
    return this.http.get<any>(this.baseurl)
    .pipe(map((res:any)=>{
      return res;
    }))
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