import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { CompAddUserPopupComponent } from '../comp-add-user-popup/comp-add-user-popup.component';
import { CompCreateProjectPopupComponent } from '../comp-create-project-popup/comp-create-project-popup.component';
import { CompCreateTeamPopupComponent } from '../comp-create-team-popup/comp-create-team-popup.component';

@Component({
  selector: 'team-utilisation-monitor-comp-navbar',
  templateUrl: './comp-navbar.component.html',
  styleUrls: ['./comp-navbar.component.scss'],
})

export class CompNavbarComponent implements OnInit {
  constructor(private matDialog: MatDialog,private adminService:AdminService,private cookie:CookieService) {}
  AdminData:any;
  requestOpenState = true;
  adminName="";
  companyName="";
  OutEmployeeName:any[]=[];
  nrOfRequests=0;



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
            Email:string
          }

          for(const requests of this.AdminData.data.getPendingRequests)
          {
            const  obj={} as nameObject;
            obj.Name=requests.name+" "+requests.surname;
            obj.Email=requests.email;
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

  onOpenAddUserClick(){
    this.matDialog.open(CompAddUserPopupComponent);
  }

  onOpenCreateProjectClick(){
    this.matDialog.open(CompCreateProjectPopupComponent);
  }

  onOpenAddSkillsClick(){
    console.log()
  }
}
