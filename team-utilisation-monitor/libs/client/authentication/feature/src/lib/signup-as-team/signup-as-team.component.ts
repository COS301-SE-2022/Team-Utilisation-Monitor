import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'team-utilisation-monitor-signup-as-team',
  templateUrl: './signup-as-team.component.html',
  styleUrls: ['./signup-as-team.component.scss']
})
export class SignupAsTeamComponent implements OnInit {

  profileForm = new FormGroup({
    teamName:new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(10)]),
    confirmPassword: new FormControl('',[Validators.required,Validators.minLength(10)])

  });

  ngOnInit(): void {
  }

  constructor(private service:AuthenticationService ,private router:Router) {}
  onSubmit() {

    if(this.profileForm.get('password')?.value==this.profileForm.get('confirmPassword')?.value)  //Password matches
    {
      //Continue with the submission
      //console.log(JSON.stringify(this.profileForm.value));
      const firstname=this.profileForm.get('firstName')?.value;
      const lastname=this.profileForm.get('lastName')?.value;
      const password=this.profileForm.get('password')?.value;
      const email=this.profileForm.get('email')?.value;
      const company=this.profileForm.get('company')?.value;
      this.service.addUser(firstname,lastname,company,email,password);
      //Redirect to the login page
      this.router.navigate(['login_page']);
    }
    else
    {
      //Console an error message
      console.log("Passwords not matching")
    }
  }
}



