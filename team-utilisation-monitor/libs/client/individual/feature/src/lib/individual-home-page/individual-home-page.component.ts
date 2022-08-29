import { CookieService } from 'ngx-cookie-service';
import { IndividualService } from './../Individual.service';
import { Component, OnInit } from '@angular/core';
import {CompProjectDataViewPopupComponent} from '../../../../../admin/feature/src/lib/comp-project-data-view-popup/comp-project-data-view-popup.component';
import {CompAddTeamToProjectPopupComponent} from '../../../../../admin/feature/src/lib/comp-add-team-to-project-popup/comp-add-team-to-project-popup.component';
import {CompProjectListComponent} from '../../../../../admin/feature/src/lib/comp-project-list/comp-project-list.component'
import {link} from "fs";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'team-utilisation-monitor-individual-home-page',
  templateUrl: './individual-home-page.component.html',
  styleUrls: ['./individual-home-page.component.scss']
})
export class IndividualHomePageComponent implements OnInit {  
  constructor(private service:IndividualService,private cookie:CookieService){}


  events: string[] = [];
  opened = true;
  panelOpenState=false;
  boolshow = false;
  utilizationPercentage = 30;
  nrOfOpenProjects = 40;       //this will be counted from the array ofcours
  nrOfClosedProjects = 50;
  nrOfTeams = 20;     //and this
  nrOfSkills= 7;
  teams: string[]=[]//['Team A', 'Team B','Team C','Team D','Team D','Team D','Team D','Team E'];
  projects: string[]=[]//['Project1','Project2','Project3','Project4','Project4','Project4','Project4','Project5'];

  ngOnInit(): void {
    console.log();
    const Email=this.cookie.get("Email");
    this.service.getUserStats(Email).subscribe(Data=>
      {
        this.nrOfOpenProjects=Data.data.GetUserStats.numberOfProjects
        this.nrOfSkills=Data.data.GetUserStats.numberOfSkills
        this.nrOfTeams=Data.data.GetUserStats.numberOfTeams
        this.utilizationPercentage=Data.data.GetUserStats.utilisation
      })

    
    this.service.getAllocatedTeams(Email).subscribe(Data=>
      {
        for(const req of Data.data.GetAllocatedTeams)
        {
          this.teams.push(req.team_name)
        }
      })

      this.service.getAllocatedProjects(Email).subscribe(Data=>
        {
          for(const req of Data.data.GetAllocateProjects)
          {
            this.projects.push(req.project_name)
          }
        })
  }

  showInfo(link: string) {
    console.log()
  }

}
