import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
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
  ngOnInit(): void {
    console.log();
  }

  onSubmit()
  {
    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      //Continue with the submission
      console.log(JSON.stringify(this.profileForm.value));

      //this.service.addUser(this.profileForm.value);
    }
    else
    {
      //Console an error message
      console.log("Passwords not matching")
    }

  }
}
