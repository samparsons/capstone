import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternalService {

  constructor() { }

  cartSubject = new Subject<any>();
  showSubject = new Subject<any>();
  userSubject = new Subject<any>();
  productSubject = new Subject<any>();


}
