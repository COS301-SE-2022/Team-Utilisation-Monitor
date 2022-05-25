import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu'
import {MatCardModule} from '@angular/material/card'
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'team-utilisation-monitor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.pattern("")]),
  });

  constructor(private service:AuthenticationService,private router:Router) {
   }


  ngOnInit(): void {
    console.log();
  }

onSubmit()
{
  if(this.loginForm.valid)
  {
    this.service.login(this.loginForm.get("email")?.value,this.loginForm.get("email")?.value).subscribe(resp=>
      {
        if(resp!=null) //Data was returned hence the login credentials are valid
        {
          //set local storage with tokens and userId
          
          this.router.navigate(['home_page']);
        }
        else
        {
          console.log("Invalid login Details")
          this.router.navigate(['']); //try again
        }
      })
  }
}

}
