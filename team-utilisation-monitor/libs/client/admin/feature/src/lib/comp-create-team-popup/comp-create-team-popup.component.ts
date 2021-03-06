/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-comp-create-team-popup',
  templateUrl: './comp-create-team-popup.component.html',
  styleUrls: ['./comp-create-team-popup.component.scss'],
})
export class CompCreateTeamPopupComponent implements OnInit {

  companyName=''
  teamForm=new FormGroup({
    teamName:new FormControl('',[Validators.required])
  })
  constructor(private adminService:AdminService,private cookie:CookieService) {}

  ngOnInit(): void {
    console.log()

  }

  OnSubmit()
  {
    if(this.teamForm.valid)
    {
    const teamName=this.teamForm.get('teamName')?.value!;
    console.log(teamName)
    this.companyName=this.cookie.get("CompanyName");
    this.adminService.createTeam(teamName,this.companyName).subscribe(()=>
      {
        alert("Team "+teamName+" Created")
      });
    }
    else
    {
      alert("Invalid Form")
    }
  }
}
