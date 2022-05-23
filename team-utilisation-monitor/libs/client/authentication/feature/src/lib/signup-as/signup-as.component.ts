import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
  selector: 'team-utilisation-monitor-signup-as',
  templateUrl: './signup-as.component.html',
  styleUrls: ['./signup-as.component.scss']
})
export class SignupAsComponent implements OnInit {

  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    company:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(10)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(10)]),

  });

  //constructor() { }

  ngOnInit(): void {
    console.log();
  }

  onSubmit()
  {
    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      //Continue with the submission
      console.log(JSON.stringify(this.profileForm.value));
     // this.service.addUser(this.profileForm.value);
    }
    else
    {
      //Console an error message
      console.log("Passwords not matching")
    }

  }

}
