import { CookieService } from 'ngx-cookie-service';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { IncreaseNumberOfProjects } from '../actions/mutate-number-of-project.action';
import { AddProject } from '../actions/mutate-add-project.action';

@Component({
  selector: 'team-utilisation-monitor-comp-create-project-popup',
  templateUrl: './comp-create-project-popup.component.html',
  styleUrls: ['./comp-create-project-popup.component.scss'],
})
export class CompCreateProjectPopupComponent implements OnInit {

  TeamNames: string[] = [];
  selectedTeams:string[]=[]; //all the teams selected will be here
  teams:any;

  projectForm=new FormGroup({
    projectName:new FormControl('',[Validators.required]),
    manHours:new FormControl('',[Validators.required]),
  })

  companyName='';
  tempData:any;
  

  constructor(private adminService:AdminService,private cookie:CookieService, private snackBar: MatSnackBar,private store:Store) {}

  
  ngOnInit(): void {
    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getAllTeamsOfACompany(this.companyName).subscribe(data=>{
      
      this.teams=data;

      //console.log(this.projects.data.getAllProjectsOfACompany.length);

      for(let i=0;i<this.teams.data.getAllTeamsOfACompany.length;++i)
      {
        //get each individual element
        this.TeamNames.push(this.teams.data.getAllTeamsOfACompany[i].team_name)
      }

    })
  }

  onGroupsChange(f_selectedTeams: string[]) {
    console.log(f_selectedTeams);
  }

  onSubmit()
  {
    
    if(this.projectForm.valid)
    {
      const projectName=this.projectForm.get('projectName')?.value!;
      const projectHours=this.projectForm.get('manHours')?.value!;

      //create the project in isolation
      this.adminService.createProject(projectName,this.companyName,"null",Number(projectHours)).subscribe(
        data=>{
            
        //assign the project to the selected teams
        for(let i=0;i<this.selectedTeams.length;++i)
        {
          this.adminService.assignProjectToTeams(this.selectedTeams[i],projectName).subscribe(
          data=>{

              if(i==this.selectedTeams.length-1)
              {
                this.adminService.CalculateUtilization(projectName).subscribe(
                  Data=>{
                    this.snackBar.open(Data.data.CalculateUtilization)
                    setTimeout(() => {
                      this.snackBar.dismiss();
                    }, 5000)
                    // alert(Data.data.CalculateUtilization)
                  }
                )
              }
          });
            
          }

      })
      this.snackBar.open("Project "+projectName+" has been created ")
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)

      this.adminService.getCompanyStats(this.companyName).subscribe(data2=>{
        console.log(data2.data.getCompanyStats.numProjects);
        this.store.dispatch(new IncreaseNumberOfProjects({value:data2.data.getCompanyStats.numProjects+1}));
      })

      //add the project to the ngxs AddProjectState
      this.store.dispatch(new AddProject({projectName:projectName,manHours:Number(projectHours)}));
    }
  }
}
