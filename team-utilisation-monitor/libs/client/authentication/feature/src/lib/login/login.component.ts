/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../Authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service'

export class User {
  constructor(public email: string, public password: string) {
  }
}

@Component({
  selector: 'team-utilisation-monitor-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  result = <unknown> Observable;
  result2 = <unknown> Observable; //i'm using this to get the user details
  result3 = <unknown> Observable; //I used this to set the active token
  @Output() loggedIn = new EventEmitter<User>();
  @Input() enabled = true;

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
            //The password is valid. Now fetch the user details from the authentication DB

            //save the details to the cookies.
            this.cookie.set("UserName",item.data.loginGateway.name+" "+item.data.loginGateway.surname);
            this.cookie.set("Email",item.data.loginGateway.username);
            this.cookie.set("token",item.data.loginGateway.token);


            /***
             * This section is used to set the active token for the logged in 
             * user.
            */
            
            this.result3=this.service.setActiveToken(email,this.cookie.get("token")).subscribe(
              data=>{
                const resp=data;
                console.log("setting token");

                if(resp.data.SetToken==true){
                  console.log("Token successfully set");
                }
                else if(resp.data==null)
                  console.log("Failed be set");

                  /****
             * Even if the main database i.e result2, fails, the user will still be 
             * able to login using data from the authentication database
             */

            this.result2=this.service.getPersonDetails(email).subscribe({
              next:(item2)=>{
                if(item2.data!=null)
                {
                  console.log("logging in");
                  this.cookie.set("CompanyName",item2.data.getOnePerson.company_name);
                  const approved=item2.data.getOnePerson.approved;

                  if(item2.data.getOnePerson.role=="ADMIN") //CURRENT USER IS ADMIN
                  {
                    this.router.navigate(['AdminHome'])
                  }
                  else if(item2.data.getOnePerson.role=="USER")
                  {
                    if(!approved) //user not yet approved
                    {
                      alert("Oops! Looks like you Request is still Pending Approval. Please contact Admin");
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
                  alert("Something went wrong; Failed to contact main DB")
                }
              }
            })}
          )}
          else{
            alert("Incorrect Details, Please Try Again");
          }
        },
        error: (err) => { console.log(err); }
      })
    }
  }

}
