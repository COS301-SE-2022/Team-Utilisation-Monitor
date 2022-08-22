/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CookieService } from 'ngx-cookie-service';
import { IncreaseNumberOfTeams } from '../actions/mutate-number-of-teams.action';
import { AdminService } from '../Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTeam } from '../actions/mutate-add-team.action';

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
  constructor(private adminService:AdminService,private cookie:CookieService,private snackBar: MatSnackBar,private readonly store:Store) {}

  ngOnInit(): void {
    console.log()

  }

  OnSubmit()
  {
    if(this.teamForm.valid)
    {
      const teamName=this.teamForm.get('teamName')?.value!;

      this.companyName=this.cookie.get("CompanyName");
      this.adminService.createTeam(teamName,this.companyName).subscribe(()=>
        {
          this.snackBar.open("Team "+teamName+" Created")
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 5000)
          //alert("Team "+teamName+" Created")
      });

      //update the front end using ngxs
      this.adminService.getCompanyStats(this.companyName).subscribe(data2=>{
        console.log(data2.data.getCompanyStats.numProjects);
        this.store.dispatch(new IncreaseNumberOfTeams({value:data2.data.getCompanyStats.numTeams+1}));
      })

      //add a new team to the ngxs state
      this.store.dispatch(new AddTeam({teamName:teamName}));

    }
    else
    { 
      this.snackBar.open("Invalid Form")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
      // alert("Invalid Form")
    }

    


  }

}
