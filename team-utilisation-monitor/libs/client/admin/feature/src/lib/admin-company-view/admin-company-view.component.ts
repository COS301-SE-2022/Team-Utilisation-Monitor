import { AdminService } from './../Admin.service';
import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'team-utilisation-monitor-admin-company-view',
  templateUrl: './admin-company-view.component.html',
  styleUrls: ['./admin-company-view.component.scss'],
})
export class AdminCompanyViewComponent implements OnInit {
   constructor(private adminService:AdminService,private cookie:CookieService) {}
  boolshow = true;
  OutOwnerName=""
  OutAdminNames:any[]=[];
  OutEmployeeName:any[]=[];
  companyName=''
  companyData:any



  panelOpenState = false;

  ngOnInit(): void {
    console.log();
   // this.adminName=this.cookie.get("UserName");

    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getCompany(this.companyName).subscribe(data=>
      {
        this.companyData=data;

        //if(this.companyData.data.GetCompanyQuery!=null)
        {
          type nameObject=
          {
            Name:string
          }


          for(const requests of this.companyData.data.GetCompanyQuery.admins)
          {
            const  obj={} as nameObject;
            obj.Name=requests.name+" "+requests.surname;
            this.OutAdminNames.push(obj);
          }

          for(const requests of this.companyData.data.GetCompanyQuery.employees)
          {
            const  obj={} as nameObject;
            obj.Name=requests.name+" "+requests.surname;
            this.OutEmployeeName.push(obj);
          }
        }
      })
  }
}
