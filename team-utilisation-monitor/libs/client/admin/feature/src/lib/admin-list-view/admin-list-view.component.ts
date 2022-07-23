import { Role } from '@prisma/client';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.scss'],
})
export class AdminListViewComponent implements OnInit {
  constructor(private service:AdminService,private cookie:CookieService) {}
  boolshow = true;
  company:any;
  companyName=''
  employeeData:any
  OutEmployeeName:any[]=[] ; /*[{Name: "Mr Cornel", Surname:"Coetzee"},
                    {Name: "Mr Cornel", Surname:"Coetzee"},
                    {Name: "Mr Cornel", Surname:"Coetzee"},
                  ];*/
  ngOnInit(): void {
    console.log();
    this.companyName=this.cookie.get("CompanyName");

    this.service.getCompany(this.companyName).subscribe(data=>{
      //
      this.employeeData=data;
        if(this.employeeData.data.GetCompanyQuery.employees!=null)
        {
          type nameObject=
          {
            Name:string
            Surname:string
            Email:string
            Role:string
          }

          for(const requests of this.employeeData.data.GetCompanyQuery.employees)
          {
            const  obj={} as nameObject;
            obj.Name=requests.name
            obj.Surname=requests.surname;
            obj.Email=requests.email;
            //console.log(obj.Email)
            obj.Role=requests.role;
            this.OutEmployeeName.push(obj);
          }
        }
    })
  }

}
