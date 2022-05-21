import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';

@Component({
  selector: 'team-utilisation-monitor-signup-as-individual',
  templateUrl: './signup-as-individual.component.html',
  styleUrls: ['./signup-as-individual.component.scss']
})
export class SignupAsIndividualComponent implements OnInit {

  //constructor(private service:AuthenticationService ) {}

  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });

  onSubmit()
  {
    console.log("We'll submit");
  }

  ngOnInit(): void {
    console.log();
  }

}
