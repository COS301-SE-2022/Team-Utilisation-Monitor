import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';

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
    company:new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(10)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(10)]),

  });

  Companies=["EPI Use","GeoTech","StarTech","Hauwei"];  //Temporary company names

  constructor(private service:AuthenticationService ) {}

  onSubmit()
  {
    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      //Continue with the submission
      console.log(JSON.stringify(this.profileForm.value));
      this.service.addUser(this.profileForm.value);
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
