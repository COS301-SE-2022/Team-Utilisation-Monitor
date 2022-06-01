import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Authentication.service';

@Component({
  selector: 'team-utilisation-monitor-signup-as',
  templateUrl: './signup-as.component.html',
  styleUrls: ['./signup-as.component.scss']
})
export class SignupAsComponent implements OnInit {

  profileForm = new FormGroup({


  });

  //constructor() { }
  loginForm: any;

  constructor(private service:AuthenticationService,private router:Router) {}

  company(): void {
    this.router.navigateByUrl('signup_as_company_page');
  }

  individual(): void {
    this.router.navigateByUrl('signup_as_individual_page');
  }

  ngOnInit(): void {
    console.log();
  }


}
