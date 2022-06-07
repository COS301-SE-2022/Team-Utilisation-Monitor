import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'team-utilisation-monitor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  result = <unknown> Observable;

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

    console.log("In login function: "+this.loginForm);

    if(this.loginForm.valid) {

      this.result = this.service.login(this.loginForm.get("email")?.value as string, this.loginForm.get("password")?.value as string).subscribe({
        next: (item) => {
          if (item.data != null){
            //localStorage.setItem("id", item.data.login.id);

            console.log("logged In!!!");
            console.log(item);

            this.router.navigate(['home_page'], {state: {id: item.data.login.id}, queryParamsHandling: "preserve"});
          }else{
            alert("Incorrect Details, Try Again!");
          }
        },
      error: (err) => { console.log(err); }
      });
    }
  }

}
