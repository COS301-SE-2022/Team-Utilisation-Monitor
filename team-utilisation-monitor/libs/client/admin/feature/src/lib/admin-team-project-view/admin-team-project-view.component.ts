import { Component, Input, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { Select, Store } from '@ngxs/store';
import { AddProject } from '../actions/mutate-add-project.action';
import { AddProjectState, AddProjectStateModel } from '../states/project.state';
import { Observable } from 'rxjs';
import { Project } from '../models/admin-project';

@Component({
  selector: 'team-utilisation-monitor-admin-team-project-view',
  templateUrl: './admin-team-project-view.component.html',
  styleUrls: ['./admin-team-project-view.component.scss'],
})

export class AdminTeamProjectViewComponent implements OnInit {

  @Select(AddProjectState.getProjects)projects$!:Observable<Project[]>;

  constructor(private adminService:AdminService,private cookie:CookieService,private readonly store:Store) {}
  
  boolshow = true;
  panelOpenState = false;
  companyName='';
  companyData:any;

  OutTeamNames:any[]=[];
  OutProject:any[]=[]; //an array of projects displayed on the view.
  

  ngOnInit(): void {
    this.companyName=this.cookie.get("CompanyName");

    this.adminService.getCompany(this.companyName).subscribe(data=>
    {
      this.companyData=data;

      type nameObject={
        Name:string
        Hours:string
      }

      for(const requests of this.companyData.data.GetCompanyQuery.projects)
      {
        const  obj={} as nameObject; //obj stores the project names
        obj.Name=requests.project_name;
        obj.Hours=requests.man_hours; //this is not working
        this.OutProject.push(obj); //object passed down

        //Initialise the ngxs state with the projects
        this.store.dispatch(new AddProject({projectName:requests.project_name,manHours:requests.man_hours}));
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

      this.projects$.subscribe(data=>{
        //get the latest update of the state Model <Add Model>
      })


    })
  }
}
