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
  result2 = <unknown> Observable; //i'm using this to get the user details

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

      //test the password and username againt the uathentication Database

      this.result=this.service.login(email,pass).subscribe({
        next:(item)=>{
          if(item.data!=null)
          {
            //The password is valid. Now fetch the user details from the main DB

            this.result2=this.service.getPersonDetails(email).subscribe({
              next:(item2)=>{
                if(item2.data!=null)
                {
                  //save the details to the cookies
                  this.cookie.set("UserName",item2.data.getOnePerson.name+" "+item2.data.getOnePerson.surname);
                  this.cookie.set("CompanyName",item2.data.getOnePerson.company_name);
                  this.cookie.set("Email",item2.data.getOnePerson.email);
                  this.cookie.set("token",item.data.loginGateway.token);

                  const approved=item2.data.getOnePerson.approved;

                  if(item2.data.getOnePerson.role=="ADMIN") //CURRENT USER IS ADMIN
                  {
                    this.router.navigate(['AdminHome'])
                  }
                  else if(item2.data.getOnePerson.role=="USER")
                  {
                    if(!approved) //user not yet approved
                    {
                      alert("Oops. Looks like you Request is still Pending Approval. Please contact Admin");
                    }
                    else
                      this.router.navigate(['individual_home_page'])
                  }
                  else
                  {
                    this.router.navigate(['home_page']) //, {state: {id: item.data.login.id}, queryParamsHandling: "preserve"});
                  }
              }
                else{
                  alert("Something went wrong; Failed to load user content")
                }
              }
            })

          }
          else{
            alert("Incorrect Details, Please Try Again");
          }
        },
        error: (err) => { console.log(err); }
      })



      /*

      this.result = this.service.login(email,pass).subscribe({
        next: (item) => {
          if (item.data != null)
          {
            this.cookie.set("UserName",item.data.login.name+" "+item.data.login.surname);
            this.cookie.set("CompanyName",item.data.login.company_name);
            this.cookie.set("Email",item.data.email);

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

      */
    }
  }

}
