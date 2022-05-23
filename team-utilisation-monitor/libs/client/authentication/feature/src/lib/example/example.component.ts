import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { observable } from 'rxjs';
import { ClientAuthenticationServiceService } from '../client-authentication-service/client-authentication-service.service';

@Component({
  selector: 'team-utilisation-monitor-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss'],
})
export class ExampleComponent implements OnInit {

  result = <unknown> observable;

  constructor(private readonly API:ClientAuthenticationServiceService) {}

  profileForm=new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })



  onSubmit(formdata: { email: string; password: string; })
  {
    console.log("In login: "+formdata);

    if(this.profileForm.valid) {
      this.result = this.API.login(formdata.email, formdata.password).subscribe({
        next: (item) => {
          if (item.data != null){
            //localStorage.setItem("id", item.data.login.id);

            console.log("logged In!!!");
            console.log(item);

            //this._router.navigate(['CompanyRepresentativeHome'], {state: {id: item.data.login.id}, queryParamsHandling: "preserve"});
          }else{
            alert("Incorrect Details, Try Again!");
          }
        },
      error: (err) => { console.log(err); }
      });
    }
  }


  ngOnInit(): void {
    console.log()
  }
}
