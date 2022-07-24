import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-admin-team-project-view',
  templateUrl: './admin-team-project-view.component.html',
  styleUrls: ['./admin-team-project-view.component.scss'],
})
export class AdminTeamProjectViewComponent implements OnInit {
  constructor(private adminService:AdminService,private cookie:CookieService) {}
  
  boolshow = true;
  panelOpenState = false;

  OutTeamNames:any[]=[];
  OutProject:any[]=[];
  companyName=''
  companyData:any

  ngOnInit(): void {
    console.log();
    this.companyName=this.cookie.get("CompanyName");

    this.adminService.getCompany(this.companyName).subscribe(data=>
    {
      this.companyData=data;

      type nameObject={
        Name:string
        //TeamName:string
      }

      for(const requests of this.companyData.data.GetCompanyQuery.projects)
      {
        const  obj={} as nameObject;
        obj.Name=requests.project_name;
        //obj.TeamName=requests.team_name; 
        this.OutProject.push(obj);
      }

      if(this.companyData.data.GetCompanyQuery!=null)
      {
        type nameObject2={
          Name:string
        }

        for(const requests of this.companyData.data.GetCompanyQuery.teams)
        {
          const  obj2={} as nameObject2;
          obj2.Name=requests.team_name;
          this.OutTeamNames.push(obj2);
        }

      }
    })
  }
}
