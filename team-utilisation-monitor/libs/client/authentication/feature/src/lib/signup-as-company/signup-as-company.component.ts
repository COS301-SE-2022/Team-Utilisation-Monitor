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

  constructor(private service:AuthenticationService ,private router:Router,private snackBar:MatSnackBar) {}

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

          //add to the authentication db
          if(item!=null){
            //check for duplicate accounts
            console.log(item.data.registerAdminGateway)
            
            if(item.data.registerAdminGateway.exists==true){
              this.snackBar.open("User Account Already Exists")
        	    setTimeout(() => {
              this.snackBar.dismiss();
              }, 5000)
            }
            else{
              //add to the main DB
              this.service.addAdmin(firstname,lastname,company,email).subscribe(data=>
              {
                this.Admin=data;
                if(this.Admin.data!=null){

                  this.snackBar.open("Welcome to "+company+" "+firstname)
        	        setTimeout(() => {
                  this.snackBar.dismiss();
                  }, 4000)

                  //Redirect to the login page
                  this.router.navigate(['']);
                }
                else{
                  this.snackBar.open("API returned null")
        	        setTimeout(() => {
                  this.snackBar.dismiss();
                  }, 5000)
                }
              });
            }
          }
          else{
            this.snackBar.open("API returned null")
        	    setTimeout(() => {
              this.snackBar.dismiss();
            }, 5000)
          }
      }})   
    }
    else
    {
      
      alert("Passwords not matching");
    }

  }
}
