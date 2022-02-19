import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../service/data/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormControl(''),
    address2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
    adminstatus: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router : Router,
    private api: UserService) { }

  ngOnInit(): void {
    this.signup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      country: ['', Validators.required],
      adminstatus: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signup.controls;
  }

  onSubmit(signup:any): void {
    this.submitted = true;
    
    if (this.signup.invalid) {
      return;
    } else {
      //localStorage.setItem('checkout',JSON.stringify(checkout.value));

      this.saveUser(signup);
      this.router.navigate(['/admin']);
    }
    console.log(JSON.stringify(this.signup.value, null, 2));

  }

  saveUser(input: any): void {
    let name = input.value.firstName + ' ' + input.value.lastName;
    let address = '';
    if(input.address2 === null) {
      address = input.value.address + ', ' + input.value.city + ', ' + input.value.state + ', ' + input.value.zip + ', ' + input.value.country; 
    }else {
      address = input.value.address + ', ' + input.value.address2 + ', ' + input.value.city + ', ' + input.value.state + ', ' + + input.value.zip + ', ' + input.value.country; 
    }
    
    let user = {
      "name":name,
      "address":address,
      "username":input.value.username,
      "password":input.value.password,
      "adminstatus":input.value.adminstatus
    }

    this.api.addUser(user)
      .subscribe(
        (data: User)=>{
          console.log(data);
        },
        (error: any) => console.log(error));
    this.router.navigate(['/admin']);
  }


}
