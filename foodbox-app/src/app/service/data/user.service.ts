import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError  } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

export class User {

  constructor(
    public id:number,
    public name: string,
    public address: string,
    public username: string,
    public password: string,
    public adminstatus: boolean
  ){}
  
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  host = '54.221.149.231';
  baseurl = 'http://'+ this.host +':8081/user';

  constructor(private http:HttpClient) { }

  getUserAuth(username:string,password:string): Observable<User> {
    return this.http.get<User>(this.baseurl + "/login/"+username+"/"+password)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  getUser(id:number): Observable<User> {
    return this.http.get<User>(`${this.baseurl}/${id}`)
    .pipe(
      catchError(this.handleError),
      map(
        (res:User)=>{
          return res;
        }))
  }

  getUsers(){
    return this.http.get<any>(this.baseurl)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  addUser(user:any): Observable<any> {
      return this.http.post<any>(this.baseurl, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
  }

  updateUser(user:any,id:number): Observable<void> {
      return this.http.put<void>(`${this.baseurl}/${id}`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
    }

    deleteUser(id:number): Observable<void> {
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