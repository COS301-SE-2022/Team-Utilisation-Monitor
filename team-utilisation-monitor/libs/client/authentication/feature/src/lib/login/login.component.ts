/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'


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

  constructor(private service:AuthenticationService,private router:Router,private cookie:CookieService) {
   }


  ngOnInit(): void {
    console.log();
  }

  onSubmit()
  {

    console.log("In login function: "+this.loginForm);

    if(this.loginForm.valid) {
      const email:string=this.loginForm.get("email")?.value!;
      const pass=this.loginForm.get("password")?.value!;
      this.result = this.service.login(email,pass).subscribe({
        next: (item) => {
          if (item.data != null)
          {
            this.cookie.set("UserName",item.data.login.name+" "+item.data.login.surname);
            this.cookie.set("CompanyName",item.data.login.company_name);

            if(item.data.login.role=="ADMIN") //CURRENT USER IS ADMIN
            {
              this.router.navigate(['AdminHome'])
            }
            else if(item.data.login.role=="USER")
            {
              this.router.navigate(['individual_home_page'])
            }
            else
            {
              this.router.navigate(['home_page']) //, {state: {id: item.data.login.id}, queryParamsHandling: "preserve"});
            }

          }else{
            alert("Incorrect Details, Try Again!");
          }
        },
      error: (err) => { console.log(err); }
      });
    }
  }

}
