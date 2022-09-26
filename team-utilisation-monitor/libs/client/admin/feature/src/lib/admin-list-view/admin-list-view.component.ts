import { Role } from '@prisma/client';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'team-utilisation-monitor-admin-list-view',
  templateUrl: './admin-list-view.component.html',
  styleUrls: ['./admin-list-view.component.scss'],
})
export class AdminListViewComponent implements OnInit {
  constructor(private service:AdminService,private cookie:CookieService,private snackBar:MatSnackBar) {}
  boolshow = true;
  company:any;
  companyName=''
  employeeData:any
  OutEmployeeName:any[]=[] ; 

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;

  sideNavMode:MatDrawerMode = 'side';

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
    console.log();
    this.companyName=this.cookie.get("CompanyName");

    

    this.service.getAllPersons().subscribe(item=>{

      this.employeeData=item;

      if(item.data.getAllPeople!=null){

        type nameObject={
          Name:string
          Surname:string
          Email:string
          Role:string
          Utilization:number
          positions:string[],
          skills:string[],
        }

        for(let i=0;i<item.data.getAllPeople.length;++i){
          const obj={} as nameObject;

          obj.Name=item.data.getAllPeople[i].name;
          obj.Surname=item.data.getAllPeople[i].surname;
          obj.Email=item.data.getAllPeople[i].email;
          obj.Utilization=item.data.getAllPeople[i].utilisation;
          obj.positions=[];
          obj.skills=[];
          
          if(item.data.getAllPeople[i].skill.length>0){

            for(let k=0;k<item.data.getAllPeople[i].skill.length;++k)
            {
              obj.skills[k]=item.data.getAllPeople[i].skill[k];
            }
          }

          if(item.data.getAllPeople[i].positions.length>0){
            for(let k=0;k<item.data.getAllPeople[i].positions.length;++k)
            {
              obj.positions[k]=item.data.getAllPeople[i].positions[k];
            }
          }

          this.OutEmployeeName.push(obj);

        }


      }
      else{
        this.snackBar.open("Something went wrong. API returned null")
        setTimeout(() => {
        this.snackBar.dismiss();
        }, 5000)
      }

    })
  }

}
