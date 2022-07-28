/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-to-project-popup',
  templateUrl: './comp-add-team-to-project-popup.component.html',
  styleUrls: ['./comp-add-team-to-project-popup.component.scss']
})
export class CompAddTeamToProjectPopupComponent implements OnInit {

  constructor(private readonly service:AdminService,private readonly cookie:CookieService){}

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

    alert("Successfully assigned Team(s) to project");
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
