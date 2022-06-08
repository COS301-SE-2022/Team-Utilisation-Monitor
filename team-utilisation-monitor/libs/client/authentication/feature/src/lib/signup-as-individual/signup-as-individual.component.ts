/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';

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
      const password=this.profileForm.get('password')?.value!;
      const email=this.profileForm.get('email')?.value!;
      const inviteCode=this.profileForm.get('Invitecode')?.value!;

      /*detect the name of the company from the table that the user's email will be registered to
      WHEN THE ADMIN ADD A PERSON USING EMAIL..WE WILL ADD THE NAME OF THE COMPANY THEY ARE BEING
      TO THEN PASS IT AS A COMPANY ON THIS FUNCTION*/
      this.service.createUser(firstname,lastname,email,password,inviteCode);

      //Redirect to the login page
      this.router.navigate(['']);
    }
    else
    {
      //Console an error message
      console.log("Passwords not matching")
    }

  }

  ngOnInit(): void {
    console.log();
  }

}
