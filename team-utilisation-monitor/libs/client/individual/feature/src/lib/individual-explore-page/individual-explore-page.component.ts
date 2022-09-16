import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { IndividualService } from './../Individual.service';

@Component({
  selector: 'team-utilisation-monitor-individual-explore-page',
  templateUrl: './individual-explore-page.component.html',
  styleUrls: ['./individual-explore-page.component.scss']
})
export class IndividualExplorePageComponent implements OnInit {
  constructor(private service:IndividualService,private cookie:CookieService){}

  events: string[] = [];
  opened = true;
  panelOpenState=false;
  boolshow = true;
  teams: string[]=[];
  projects: string[]=[]; 

  //constructor() { }

  ngOnInit(): void {
    console.log();
    const Email=this.cookie.get("Email");

    this.service.getAllocatedProjects(Email).subscribe(Data=>
      {
        for(const req of Data.data.GetAllocateProjects)
        {
          this.projects.push(req.project_name)
        }
      })

    this.service.getAllocatedTeams(Email).subscribe(Data=>
      {
        for(const req of Data.data.GetAllocatedTeams)
        {
          this.teams.push(req.team_name)
        }
      })
  }
  showInfo(link: string) {
    console.log()
  }

}
