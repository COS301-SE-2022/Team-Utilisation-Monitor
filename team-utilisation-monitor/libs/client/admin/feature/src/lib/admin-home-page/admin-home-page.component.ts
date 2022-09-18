import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { IncreaseNumberOfEmployees } from '../actions/mutate-number-of-employees.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NumberOfEmployees } from '../models/admin-number-of-employees';
import { IncreaseNumberOfEmployeesState, IncreaseNumberOfEmployeesStateModel } from '../states/number-of-employees.state';
import { IncreaseNumberOfProjectsState, IncreaseNumberOfProjectsStateModel } from '../states/number-of-projects.state';
import { IncreaseNumberOfProjects } from '../actions/mutate-number-of-project.action';
import { IncreaseNumberOfTeams } from '../actions/mutate-number-of-teams.action';
import { IncreaseNumberOfTeamsState } from '../states/number-of-teams.state';
import { AddSkill } from '../actions/mutate-add-skill.action';
import { IncreaseNumberOfClosedProjectsState } from '../states/number-of-closed-projects.state';
import { IncreaseNumberOfClosedProjects } from '../actions/mutate-number-of-closed-projects.action';

@Component({
  selector: 'team-utilisation-monitor-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {

  @Select(IncreaseNumberOfEmployeesState.getNumberOfEmployees)employees$!:Observable<number>
  @Select(IncreaseNumberOfProjectsState.getNumberOfProjects)projects$!:Observable<number>;
  @Select(IncreaseNumberOfTeamsState.getNumberOfTeams)teams$!:Observable<number>;
  @Select(IncreaseNumberOfClosedProjectsState.getNumberOfClosedProjects)closedProjects$!:Observable<number>;

  constructor(private adminService:AdminService,private cookie:CookieService,private store:Store) {

    this.teams$.subscribe(data=>{
      //
    })

    this.employees$.subscribe(data=>{
      //
    })

    this.projects$.subscribe(data=>{
      //
    })
  }

  //information cards values, calculate them and update the variables to link it to the front end
  boolshow = true;

  statsData:any;
  nrOfEmployees!:number;
  utilizationPersentage=0;
  nrOfOpenProjects = 0;
  nrOfClosedProjects = 0;
  nrOfTeams=0;
  companyName="0";
  skillsData:any;

  //I use these values to subscribe to the ngxs.
  //"dynamic" because these values are changing

  tempData!:number;
  dynamicProjects!:number;
  dynamicTeams!:number;
  dynamicClosedProjects!:number;

  someFunc(){
    this.projects$.subscribe(data3=>{
      console.log(data3);
    })

    this.teams$.subscribe(data4=>{
      console.log(data4)
    })

    this.employees$.subscribe(data2=>{
      console.log(data2);
    })

  }


  ngOnInit(): void {
    console.log();

    this.companyName=this.cookie.get("CompanyName");

    this.adminService.getCompanyStats(this.companyName).subscribe(data=>{

      console.log("Company Stats");
      console.log(data);
      
      this.nrOfEmployees=data.data.getCompanyStats.numEmployees;
      //utilizationPersentage=data.data.getCompanyStats.numEmployees;
      this.nrOfOpenProjects =data.data.getCompanyStats.numProjects;
      this.nrOfClosedProjects=data.data.getCompanyStats.numCompleteProjects;
      this.nrOfTeams=data.data.getCompanyStats.numTeams;
      this.utilizationPersentage=Math.round((data.data.getCompanyStats.Utilization)*100)/100;

      //write or initialize the state
      this.store.dispatch(new IncreaseNumberOfEmployees({value:this.nrOfEmployees}));
      this.store.dispatch(new IncreaseNumberOfProjects({value:this.nrOfOpenProjects}));
      this.store.dispatch(new IncreaseNumberOfTeams({value:this.nrOfTeams}));
      this.store.dispatch(new IncreaseNumberOfClosedProjects({value:this.nrOfClosedProjects}));

      this.employees$.subscribe(data2=>{
        this.tempData=data2;
      })

      this.projects$.subscribe(data3=>{
        this.dynamicProjects=data3;
      })

      this.teams$.subscribe(data4=>{
        this.dynamicTeams=data4;
      })

      this.closedProjects$.subscribe(data5=>{
        this.dynamicClosedProjects=data5;
      })

      

      
      
    })




  }
}
