import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../Admin.service';
import { CompAddTeamToProjectPopupComponent } from '../comp-add-team-to-project-popup/comp-add-team-to-project-popup.component';
import { CompProjectDataViewPopupComponent } from '../comp-project-data-view-popup/comp-project-data-view-popup.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { RemoveProject } from '../actions/mutate-remove-project.action';
import { IncreaseNumberOfClosedProjects } from '../actions/mutate-number-of-closed-projects.action';
import { IncreaseNumberOfProjects } from '../actions/mutate-number-of-project.action';

@Component({
  selector: 'team-utilisation-monitor-comp-project-list',
  templateUrl: './comp-project-list.component.html',
  styleUrls: ['./comp-project-list.component.scss'],
})

export class CompProjectListComponent implements OnInit {
  
  constructor(private matDialog: MatDialog,private readonly cookie:CookieService,private service:AdminService, private snackBar: MatSnackBar,private store:Store) {}

  @Input() Projects!:{projectName:string, manHours:number};
  companyName="default";



  //the object has been passed down from the parent component
  //get Team associated with the Project from back end;

  ngOnInit(): void {
    console.log();
    this.companyName=this.companyName=this.cookie.get("CompanyName");
  }

  onOpenAddTeams(){
    this.cookie.set("project_name",this.Projects.projectName); //store the project name as a cookie
    this.matDialog.open(CompAddTeamToProjectPopupComponent);
  }

  onOpenProjectDataViewClick(){
    this.cookie.set("project_name",this.Projects.projectName);
    this.matDialog.open(CompProjectDataViewPopupComponent);
  }

  CompleteProject()
  {
    this.service.CompleteProject(this.Projects.projectName).subscribe(Data=>
    {
      this.snackBar.open("Project "+this.Projects.projectName + " has been completed")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    })

    //remove the project
    //this.store.dispatch(new RemoveProject({projectName:this.Projects.projectName,manHours:this.Projects.manHours}));
  }

  DeleteProject()
  {
    this.service.DeleteProject(this.Projects.projectName).subscribe(Data=>
      {
        this.snackBar.open("Project "+this.Projects.projectName + " has been deleted")
        setTimeout(() => {
          this.snackBar.dismiss();
        }, 5000)
    })

    this.store.dispatch(new RemoveProject({projectName:this.Projects.projectName,manHours:this.Projects.manHours}));
  }


}
