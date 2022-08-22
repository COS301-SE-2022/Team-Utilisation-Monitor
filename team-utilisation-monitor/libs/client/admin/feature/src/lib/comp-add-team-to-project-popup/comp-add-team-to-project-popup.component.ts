/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { setMaxListeners } from 'process';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-to-project-popup',
  templateUrl: './comp-add-team-to-project-popup.component.html',
  styleUrls: ['./comp-add-team-to-project-popup.component.scss']
})
export class CompAddTeamToProjectPopupComponent implements OnInit {

  constructor(private readonly service:AdminService,private readonly cookie:CookieService, private snackBar: MatSnackBar){}

  @Input() Project!: { Name: string, TeamName: string, Hours: number };

  teamsData:any;
  selectedTeams:string[]=[]; //selected teams
  TeamNames: string[] = [];
  run:any;

  AddTeams(){
    //console.log(this.selectedTeams);

    for(let i=0;i<this.selectedTeams.length;++i)
    {
      this.service.assignProjectToTeams(this.selectedTeams[i],this.cookie.get("project_name")).subscribe(
        data=>{
          this.run=data;
        }
      )
    }
    
    if(this.selectedTeams.length == 0){
      this.snackBar.open("Please Select at least one Team to add to" + this.cookie.get("project_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }

    if(this.selectedTeams.length == 1){
      this.snackBar.open("Successfully assigned "+ this.selectedTeams[0] +" to " + this.cookie.get("project_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }

    if(this.selectedTeams.length > 1){
      let sTeamNames: string;
      sTeamNames = this.selectedTeams[0];
      for(let i=1;i<this.selectedTeams.length;++i){
        sTeamNames = sTeamNames + ', ' + this.selectedTeams[i];
      }
      this.snackBar.open("Successfully assigned "+ sTeamNames +" to " + this.cookie.get("project_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {

    this.service.getAvailableTeams(this.cookie.get("project_name")).subscribe(
      data=>{

        this.teamsData=data;
        //console.log(this.teamsData)

        for(let i=0;i<this.teamsData.data.GetAvailableTeams.length;++i)
        {
          this.TeamNames[i]=this.teamsData.data.GetAvailableTeams[i];
        }

      }
    )   
  }

}
