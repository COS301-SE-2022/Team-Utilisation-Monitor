import { AdminService } from './../Admin.service';
import { Component, OnInit ,Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-member-popup',
  templateUrl: './comp-add-team-member-popup.component.html',
  styleUrls: ['./comp-add-team-member-popup.component.scss'],
})
export class CompAddTeamMemberPopupComponent implements OnInit {

  constructor(private service:AdminService,private cookie:CookieService) {}

  //employeeNames: string[] =[] //['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  employeeObjects: any[] =[]
  employeeData:any

  @Input() TeamName!: { Name: string };

  AddTeamMember(teamName:string,EmployeeEmail:string)
  {
    this.service.AddTeamMember(teamName,EmployeeEmail).subscribe(data=>{
      alert(data.data.AddTeamMember)
    })
  }

  ngOnInit(): void {
    console.log()
    this.service.GetUnderUtilizedEmps(this.cookie.get("CompanyName")).subscribe(data=>{
      this.employeeData=data;

      type nameObject=
      {
        Name:string
        Surname:string
        Email:string
        Role:string
      }

      for(const requests of this.employeeData.data.GetUnderUtilizedEmployees)
      {
        const  obj={} as nameObject;
        obj.Name=requests.name
        obj.Surname=requests.surname;
        obj.Email=requests.email;
        //console.log(obj.Email)
        obj.Role=requests.role;
        this.employeeObjects.push(obj);
      }
    })
  }
}
