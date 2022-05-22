import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';

@Component({
  selector: 'team-utilisation-monitor-signup-as-individual',
  templateUrl: './signup-as-individual.component.html',
  styleUrls: ['./signup-as-individual.component.scss']
})
export class SignupAsIndividualComponent implements OnInit {

  //constructor(private service:AuthenticationService ) {}

  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    company:new FormControl('',[Validators.required]),
    passwordGroup: new FormGroup({
      password: new FormControl('',[Validators.required,Validators.minLength(10)]),
      confirmPassword: new FormControl('',[Validators.required,Validators.minLength(10)]),

    })
  });

  Companies =["EPI Use","GeoTech","StarTech","Hauwei"];  //Temporary company names

  onSubmit()
  {
    console.log(JSON.stringify(this.profileForm.value));
  }

  ngOnInit(): void {
    console.log();
  }

}
