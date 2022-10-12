import { AdminService } from './../Admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'team-utilisation-monitor-admin-company-view',
  templateUrl: './admin-company-view.component.html',
  styleUrls: ['./admin-company-view.component.scss'],
})
export class AdminCompanyViewComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  sideNavMode:MatDrawerMode = 'side';

  AssignHoursForm=new FormGroup({
    assignHoursArray:this.formBuilder.array([])
  });

  constructor(private adminService:AdminService,private cookie:CookieService,private snackBar:MatSnackBar, private formBuilder:FormBuilder) {
    
  }
  
  boolshow = true;
  OutOwnerName=""
  OutAdminNames:any[]=[];
  OutEmployeeName:any[]=[];
  weeklyHoursArr:any[]=[];
  companyName='';
  companyData:any;
  hours:any;

  assignHoursArray=this.AssignHoursForm.get('assignHoursArray') as FormArray;

  onResize(event : Event): void{
    if (this.sidenav != null) {
      if (window.innerWidth < 1200) {
        this.sidenav.mode = "over";
        this.sidenav.opened = false;
      }
      else{
        this.sidenav.mode = "side";
        this.sidenav.opened = true;
      }
    }
  }

  ngOnInit(): void {
    //responsiveness
    if(window.innerWidth < 1150){
      this.sideNavMode = 'over';
    }

    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getCompany(this.companyName).subscribe(data=>{
    this.companyData=data;

    if(this.companyData.data.GetCompanyQuery!=null)
    {
      type nameObject=
      {
        Name:string
        Surname:string
        Email:string
        WeeklyHours:string
      }


      for(const requests of this.companyData.data.GetCompanyQuery.admins)
      {
        const  obj={} as nameObject;
        obj.Name=requests.name;
        obj.Surname=requests.surname;
        obj.Email=requests.email;
        this.OutAdminNames.push(obj);
      }

      for(const requests of this.companyData.data.GetCompanyQuery.employees)
      {
        if(requests.role=="USER"){
          const  obj={} as nameObject;
          obj.Name=requests.name;
          obj.Surname=requests.surname;
          obj.Email=requests.email;
          obj.WeeklyHours=requests.weekly_Hours;
          this.OutEmployeeName.push(obj);      

          this.weeklyHoursArr.push(obj.WeeklyHours);
        }
      }

      this.weeklyHoursArr.forEach(element => {
        this.assignHoursArray.push(this.formBuilder.group({hours: element}))
      });   

    }})
  }

  updateWeeklyHours(email:string, index:number){
    //console.log(this.AssignHoursForm.value);
    //console.log(email+" "+index);
    //console.log(this.AssignHoursForm.get('assignHoursArray')?.value[index]);

    const hours=this.assignHoursArray.at(index).value.hours;
    
    this.adminService.updateWeeklyHoursForEmployee(email,hours as unknown as number).subscribe(
      data=>{

        const employee_updated=this.getEmployeeObjectFromEmail(email);

        if(employee_updated!=null){
          this.snackBar.open("Updated "+employee_updated.Name+" "+employee_updated.Surname+"'s hours" )
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 1000)
        }

      }
    )
    
      
  }

  getEmployeeObjectFromEmail(email:string):any{

    for(let i=0;i<this.OutAdminNames.length;++i){
      if(this.OutAdminNames[i]!=null && this.OutAdminNames[i].Email==email){
        return this.OutAdminNames[i];
      }
    }

    for(let i=0;i<this.OutEmployeeName.length;++i){
      if(this.OutEmployeeName[i]!=null && this.OutEmployeeName[i].Email==email)
      {
        return this.OutEmployeeName[i];
      }
    }

    return null;
  }

  DeleteEmployee(email:string)
  {
    this.adminService.DeleteEmployee(email).subscribe(data=>{
      
      let found=false;

      for(let i=0;i<this.OutAdminNames.length;++i){
        if(this.OutAdminNames[i]!=null && this.OutAdminNames[i].Email==email)
        {
          this.OutAdminNames.splice(i,1);
          found=true;
          break;
        }
      }

      if(found==false){
        for(let i=0;i<this.OutEmployeeName.length;++i){
          if(this.OutEmployeeName[i]!=null && this.OutEmployeeName[i].Email==email)
          {
            this.OutEmployeeName.splice(i,1);
          }
        }
      }

      const employee_updated=this.getEmployeeObjectFromEmail(email);

      if(employee_updated!=null)
      {
        this.snackBar.open("Removed "+employee_updated.Name+" "+employee_updated.Surname+" from the system" )
        setTimeout(() => {
        this.snackBar.dismiss();
        }, 5000)
      }

    })
  }
}
