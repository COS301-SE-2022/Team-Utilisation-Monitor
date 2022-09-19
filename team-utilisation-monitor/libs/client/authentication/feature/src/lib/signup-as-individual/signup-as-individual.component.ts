/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-signup-as-individual',
  templateUrl: './signup-as-individual.component.html',
  styleUrls: ['./signup-as-individual.component.scss']
})
export class SignupAsIndividualComponent implements OnInit {



  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    Invitecode:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.pattern("")]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(8)]),

  });

  User:any


  constructor(private service:AuthenticationService ,private router:Router,private snackBar:MatSnackBar) {}

  onSubmit()
  {
    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      const firstname=this.profileForm.get('firstName')?.value!;
      const lastname=this.profileForm.get('lastName')?.value!;
      const password=this.profileForm.get('password')?.value!;
      const email=this.profileForm.get('email')?.value!;
      const inviteCode=this.profileForm.get('Invitecode')?.value!;

      if(this.profileForm.valid)
      {

        this.service.createUser(firstname,lastname,email,inviteCode).subscribe({
          next:(item)=>{

            console.log(item);
            
            if(item.data!=null){

              if(item.data.createUser.error_string=="DUPLICATE_EMAIL")
              {
                this.snackBar.open("User Already Exists")
                setTimeout(() => {
                this.snackBar.dismiss();
                }, 5000)
              }
              else if(item.data.createUser.error_string=="INVALID_INVITE_CODE"){
                this.snackBar.open("Invite link doesn't exist on our system")
                setTimeout(() => {
                this.snackBar.dismiss();
                }, 5000)
              }
              else{
                this.service.registerUser(firstname,lastname,email,password).subscribe(data =>
                {
                  if(data!=null)
                  {
                    this.snackBar.open("Registration successful. Welcome "+firstname+" "+lastname)
                    setTimeout(() => {
                    this.snackBar.dismiss();
                    }, 5000)

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
            else
            {
              this.snackBar.open("Main Api returned null")
              setTimeout(() => {
              this.snackBar.dismiss();
              }, 5000)
            }
          },
          error: (err)=>{console.log(err)}
        })
      }
    }
    else
    {
      this.snackBar.open("Password do not Match")
      setTimeout(() => {
      this.snackBar.dismiss();
      }, 5000)
    }

  }

  ngOnInit(): void {
    console.log();
  }

}


