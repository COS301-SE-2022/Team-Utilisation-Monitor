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
  teams: string[]=['Java','c++','angular', 'prisma'];
  projects: string[]=[]; 
  trendingSkills: any[]=[];
  

  //constructor() { }

  ngOnInit(): void {
    console.log();
    const Email=this.cookie.get("Email");

    //TO BE ADJUSTED TO GET TECHNOLOGIES. THIS IS HERE FOR THE MATTER OF LINKING IN THE FRONT END
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

    this.service.getTrendingSkill(Email).subscribe(Data=>
      {
        type skillObj=
        {
          name:string,
          description: string,
          type:string,
          level:string,
          skillsNeeded:string,
          benefits:string
        }
        for(const currSkill of Data.data.getTrendingSkill)
        {
          const obj={} as skillObj;
          obj.name= currSkill.name;
          obj.description=currSkill.description;

          this.trendingSkills.push(obj);
        }
      })
  }
  showInfo(link: string) {
    console.log()
  }

}
