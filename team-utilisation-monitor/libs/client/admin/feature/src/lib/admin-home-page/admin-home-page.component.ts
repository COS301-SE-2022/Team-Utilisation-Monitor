import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { IncreaseNumberOfEmployees } from '../actions/mutate-number-of-employees.action';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NumberOfEmployees } from '../models/admin-number-of-employees';
import { IncreaseNumberOfEmployeesState, IncreaseNumberOfEmployeesStateModel } from '../states/number-of-employees.state';

@Component({
  selector: 'team-utilisation-monitor-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {

  @Select(IncreaseNumberOfEmployeesState.getNumberOfEmployees)employees$!:Observable<IncreaseNumberOfEmployeesStateModel>

  constructor(private adminService:AdminService,private cookie:CookieService,private store:Store) {
    this.employees$.subscribe(data=>{
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
  tempData!:IncreaseNumberOfEmployeesStateModel;




  ngOnInit(): void {

    console.log();

    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getCompanyStats(this.companyName).subscribe(data=>{
      this.nrOfEmployees=data.data.getCompanyStats.numEmployees;
      //utilizationPersentage=data.data.getCompanyStats.numEmployees;
      this.nrOfOpenProjects =data.data.getCompanyStats.numProjects;
      //nrOfClosedProjects = 0;
      this.nrOfTeams=data.data.getCompanyStats.numTeams;
      this.utilizationPersentage=Math.round((data.data.getCompanyStats.Utilization)*100)/100;

      //write or initialize the state
      this.store.dispatch(new IncreaseNumberOfEmployees({value:this.nrOfEmployees}));

      this.employees$.subscribe(data=>{
        this.tempData=data
      })

    })

  }

  //read from the store

}
