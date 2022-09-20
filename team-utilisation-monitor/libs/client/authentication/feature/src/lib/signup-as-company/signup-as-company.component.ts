/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  constructor(private service:AuthenticationService ,private router:Router,private snackbar:MatSnackBar) {}

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

      this.service.registerAdmin(firstname,lastname,email,password).subscribe({
        next:(item)=>{

          if(item.data.registerAdminGateway!=null){

            if(item.data.registerAdminGateway.exists_person==true){ //user already exists
              this.snackbar.open("Admin Already Exists")
              setTimeout(() => {
              this.snackbar.dismiss();
              }, 5000)
            }
            else{
                //register in mainDB
                this.service.addAdmin(firstname,lastname,company,email).subscribe(data=>
                {
                  this.Admin=data;
                  if(this.Admin.data!=null)
                  {
                    this.snackbar.open("Registration successful. Welcome to "+company+" "+firstname)
                    setTimeout(() => {
                    this.snackbar.dismiss();
                    }, 6000)

                    //Redirect to the login page
                    this.router.navigate(['']);
                  }
                  else{
                    this.snackbar.open("Main Api Returned null")
                    setTimeout(() => {
                    this.snackbar.dismiss();
                    }, 5000)
                  }
                });
            }
          }
          else{
            this.snackbar.open("Api Returned null")
            setTimeout(() => {
            this.snackbar.dismiss();
            }, 5000)
          }
        }
      })
    }
    else
    {
      this.snackbar.open("Passwords Not Matching")
      setTimeout(() => {
        this.snackbar.dismiss();
      }, 5000)
    }

  }
}
