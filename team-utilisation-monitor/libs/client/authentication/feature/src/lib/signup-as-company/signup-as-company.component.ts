/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Authentication.service';

@Component({
  selector: 'team-utilisation-monitor-signup-as-company',
  templateUrl: './signup-as-company.component.html',
  styleUrls: ['./signup-as-company.component.scss']
})
export class SignupAsCompanyComponent implements OnInit {

  //constructor() { }

  profileForm = new FormGroup({
      companyName:new FormControl('',[Validators.required]),
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(10)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(10)])

  });
  Admin:any;
  ngOnInit(): void {
    console.log();
  }

  //Companies=["EPI Use","GeoTech","StarTech","Hauwei"];  //Temporary company names
  constructor(private service:AuthenticationService ,private router:Router) {}

  onSubmit()
  {
    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      //Continue with the submission
      //console.log(JSON.stringify(this.profileForm.value));
      const firstname=this.profileForm.get('firstName')?.value!;
      const lastname=this.profileForm.get('lastName')?.value!;
      const email=this.profileForm.get("email")?.value!;
      const password=this.profileForm.get("password")?.value!;
      const company=this.profileForm.get('companyName')?.value!;

      this.service.addAdmin(firstname,lastname,company,email).subscribe(data=>
      {
        this.Admin=data;
        if(this.Admin.data!=null)
        {
          //
        }
      });

      //register on authentication DB
      this.service.registerAdmin(email,password).subscribe(data=>
      {
        if(data!=null)
        {
          //some logic here
        }
        else{
          console.log("data is null "+data);
        }
      });

      //Redirect to the login page
      this.router.navigate(['']);
    }
    else
    {
      //Console an error message
      alert("Passwords not matching");
    }

  }
}
