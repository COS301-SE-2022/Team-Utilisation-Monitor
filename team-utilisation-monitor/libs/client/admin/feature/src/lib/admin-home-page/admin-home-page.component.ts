import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit {
  constructor(private adminService:AdminService,private cookie:CookieService) {}

  //information cards values, calculate them and update the variables to link it to the front end
  boolshow = true;
  /*nrOfEmployees = 108;
  utilizationPersentage = 80;
  nrOfOpenProjects = 40;
  nrOfClosedProjects = 50;
  nrOfTeams = 20;*/

  statsData:any;
  nrOfEmployees=0;
  utilizationPersentage=0;
  nrOfOpenProjects = 0;
  nrOfClosedProjects = 0;
  nrOfTeams=0;
  companyName="0";


  ngOnInit(): void {
    console.log();
    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getCompanyStats(this.companyName).subscribe(data=>
      {
        data;
        this.nrOfEmployees=data.data.getCompanyStats.numEmployees;
        //utilizationPersentage=data.data.getCompanyStats.numEmployees;
        this.nrOfOpenProjects =data.data.getCompanyStats.numProjects;
        //nrOfClosedProjects = 0;
        this.nrOfTeams=data.data.getCompanyStats.numTeams;
      })
  }
}
