import { AdminService } from './../Admin.service';
import { Component, OnInit ,Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { validate } from 'graphql';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-member-popup',
  templateUrl: './comp-add-team-member-popup.component.html',
  styleUrls: ['./comp-add-team-member-popup.component.scss'],
})
export class CompAddTeamMemberPopupComponent implements OnInit {

  constructor(private service:AdminService,private cookie:CookieService, private snackBar: MatSnackBar) {}

  @Input() TeamName!: { Name: string };

  

  //employeeNames: string[] =[] //['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  employeeObjects: any[] =[];
  employeeData:any;
  selectedEmployees:string[]=[];
  team_name='';

 
  membersForm=new FormGroup({
    filterEmployees:new FormControl,
  })

  addTeamMembers(){

    //console.log(this.cookie.get("team_name"));
    //console.log(this.selectedEmployees);

    for(let i=0;i<this.selectedEmployees.length;++i)
    {
      this.service.AddTeamMember(this.cookie.get("team_name"),this.selectedEmployees[i]).subscribe(
        data=>{
          //some logic *1
        }
      )
    }

    if(this.selectedEmployees.length == 0){
      this.snackBar.open("Please Select at least one Employee to add to" + this.cookie.get("team_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }

    if(this.selectedEmployees.length == 1){
      this.snackBar.open("Successfully assigned "+ this.selectedEmployees[0] +" to " + this.cookie.get("team_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }

    if(this.selectedEmployees.length > 1){
      let sEmployeeNames: string;
      sEmployeeNames = this.selectedEmployees[0];
      for(let i=1;i<this.selectedEmployees.length;++i){
        sEmployeeNames = sEmployeeNames + ', ' + this.selectedEmployees[i];
      }
      this.snackBar.open("Successfully assigned "+ sEmployeeNames +" to " + this.cookie.get("team_name"));
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }
  }

 

  
  ngOnInit(): void {

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
        obj.Role=requests.role;
        this.employeeObjects.push(obj);
      }
    })
  }

}
