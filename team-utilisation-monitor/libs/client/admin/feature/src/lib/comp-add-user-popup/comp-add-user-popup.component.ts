import { CookieService } from 'ngx-cookie-service';
import { AdminService } from './../Admin.service';
import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'team-utilisation-monitor-comp-add-user-popup',
  templateUrl: './comp-add-user-popup.component.html',
  styleUrls: ['./comp-add-user-popup.component.scss'],
})
export class CompAddUserPopupComponent implements OnInit {
  companyName=''
  inviteCode=""
  AdminEmail=""
  LandingPage="http://localhost:4200/signup_as_individual_page"
  Href=""

  profileForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })

  constructor(private service:AdminService,private cookie:CookieService) {}

  ngOnInit(): void {
    console.log();
    this.companyName=this.cookie.get("CompanyName");
    this.service.getInviteCode(this.companyName).subscribe(data=>
    {
      this.inviteCode=data.data.getInviteCode
      //console.log(this.inviteCode)
    })
    this.AdminEmail=this.cookie.get("Email");

  }

  execute()
  {

    if(this.profileForm.get('email')?.value)
    {
      this.Href='mailto:'+this.profileForm.get('email')?.value+'?subject=Invitation%20to%20Join%20'+this.companyName+'&body=Please%20use%20this%20Invitation%20Code:'+this.inviteCode+ '%20to%20register%20as%20an%20Individual%20at%20the%20following%20link:'+this.LandingPage
    }
    else
    {
      alert("Please Enter an Eamil address to send the invite link to")
    }
  }

}
