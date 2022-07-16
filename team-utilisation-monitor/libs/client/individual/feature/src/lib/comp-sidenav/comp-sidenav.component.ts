import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AdminService} from "../../../../../admin/feature/src/lib/Admin.service";
import {CookieService} from "ngx-cookie-service";
import {
  CompCreateTeamPopupComponent
} from "../../../../../admin/feature/src/lib/comp-create-team-popup/comp-create-team-popup.component";
import {
  CompCreateProjectPopupComponent
} from "../../../../../admin/feature/src/lib/comp-create-project-popup/comp-create-project-popup.component";

@Component({
  selector: 'team-utilisation-monitor-comp-sidenav',
  templateUrl: './comp-sidenav.component.html',
  styleUrls: ['./comp-sidenav.component.scss']
})
export class CompSidenavComponent implements OnInit {

  constructor(private matDialog: MatDialog,private adminService:AdminService,private cookie:CookieService) {}
  AdminData:any;
  requestOpenState = true;
  adminName="";
  companyName="";
  OutEmployeeName:any[]=[];
  nrOfRequests=0;



  /* nrOfRequests = 5; //nr of user request sent out and pending, count of the array 'OutEmployeeName'
   adminName = "Agape Mamphasa";
   OutEmployeeName = [{Name: "Cornel Coetzee"},
                     {Name: "Gift Monwa"},
                     {Name: "Rourke Amiss"},
                     {Name: "Agape Mamphasa"},
                     {Name: "Agape Mamphasa"},
                   ];   */

  ngOnInit(): void {
    console.log()
    this.adminName=this.cookie.get("UserName");
    this.companyName=this.cookie.get("CompanyName");

    this.adminService.getPendingRequests(this.companyName).subscribe(data=>
    {
      this.AdminData=data;
      //console.log(JSON.stringify(this.AdminData.data));

      if(this.AdminData.data.getPendingRequests!=null)
      {
        let count=0;
        type nameObject=
          {
            Name:string
          }

        for(const requests of this.AdminData.data.getPendingRequests)
        {
          const  obj={} as nameObject;
          obj.Name=requests.name+" "+requests.surname;
          this.OutEmployeeName.push(obj);
          count++;
        }
        this.nrOfRequests=count
      }
    })
    console.log()

  }

  onOpenCreateTeamClick(){
    this.matDialog.open(CompCreateTeamPopupComponent);
  }

  onOpenCreateProjectClick(){
    this.matDialog.open(CompCreateProjectPopupComponent);
  }
}
