import { Component, OnInit } from '@angular/core';
import { InternalService } from '../service/data/internal.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  cartCount:number = 0;
  constructor(private internal: InternalService) { 
    this.internal.cartSubject.subscribe((data)=>{
      this.cartCount = data;
    });
  }

  ngOnInit(): void {
  }
}
