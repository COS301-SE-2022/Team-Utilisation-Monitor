import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { CompAddUserPopupComponent } from '../comp-add-user-popup/comp-add-user-popup.component';
import { CompCreateProjectPopupComponent } from '../comp-create-project-popup/comp-create-project-popup.component';
import { CompCreateTeamPopupComponent } from '../comp-create-team-popup/comp-create-team-popup.component';
import { CompAddSkillsPopupComponent } from '../comp-add-skills-popup/comp-add-skills-popup.component';
import { CompAddPositionsPopupComponent } from '../comp-add-positions-popup/comp-add-positions-popup.component';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NumberOfEmployees } from '../models/admin-number-of-employees';
import { IncreaseNumberOfEmployeesState } from '../states/number-of-employees.state';
import { IncreaseNumberOfEmployees } from '../actions/mutate-number-of-employees.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-comp-navbar',
  templateUrl: './comp-navbar.component.html',
  styleUrls: ['./comp-navbar.component.scss'],
})

export class CompNavbarComponent implements OnInit {

  nrOfEmployees$: Observable<NumberOfEmployees>=new Observable<NumberOfEmployees>;
  
  constructor(private matDialog: MatDialog,private adminService:AdminService,private cookie:CookieService,private store:Store, private snackBar: MatSnackBar) {
    
    this.nrOfEmployees$=this.store.select(state => state.NumberOfEmployees.NumberOfEmployees) //number of employees is the model
  }
  
  AdminData:any;
  requestOpenState = true;
  adminName="";
  companyName="";
  OutEmployeeName:any[]=[]; //array containing the names
  nrOfRequests=0;
  nrOfEmployees=0;
 
  ngOnInit(): void {
    console.log()
    this.adminName=this.cookie.get("UserName");
    this.companyName=this.cookie.get("CompanyName");

    this.adminService.getPendingRequests(this.companyName).subscribe(data=>
    {
      this.AdminData=data;

      if(this.AdminData.data.getPendingRequests!=null)
      {
        let count=0;

        type nameObject={
          Name:string,
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
        }})

      console.log()

  }

  onOpenCreateTeamClick(){
     this.matDialog.open(CompCreateTeamPopupComponent);
  }

  onOpenAddUserClick(){
    this.matDialog.open(CompAddUserPopupComponent);
  }

  onOpenCreateProjectClick(){
    this.matDialog.open(CompCreateProjectPopupComponent,{
      height: '450px',
      width: '700px',
    });
  }

  onOpenAddSkillsClick(){
    this.matDialog.open(CompAddSkillsPopupComponent,{
      height: '450px',
      width: '700px',
    });
  }

  onOpenAddPositionsClick(){
    this.matDialog.open(CompAddPositionsPopupComponent,{
      height: '450px',
      width: '700px',
    });
  }

  removeFromPendingList(name:string){

    let index=-1; //this is the index of the user within the OutEmployeeName

    for(let i=0;i<this.OutEmployeeName.length;++i){
      if(this.OutEmployeeName[i].Name==name){
        index=i;
      }
    }

    if(index>=0){
      this.adminService.approveRequest(this.OutEmployeeName[index].Email).subscribe(data=>{
        
        //now remove the pending user from the front end
        --this.nrOfRequests;
        for(let i=0;i<this.OutEmployeeName.length;++i){
          if(this.OutEmployeeName[i].Name==name){
            this.OutEmployeeName.splice(i,1); //remove selected user
          }
        }

        this.adminService.getCompanyStats(this.companyName).subscribe(data=>
        {
          //get the current number of employees using a service
          this.nrOfEmployees=data.data.getCompanyStats.numEmployees;
          
          //update the store for the admin-home-page.component to read
          this.store.dispatch(new IncreaseNumberOfEmployees({value:this.nrOfEmployees})); 
        })


      })
    }
    else{
      this.snackBar.open("Critical Error: Data between frontend and backEnd inconsistent. Please Refresh the page")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
      // alert("Critical Error: Data between frontend and backEnd inconsistent")
    }

    
  }
}
