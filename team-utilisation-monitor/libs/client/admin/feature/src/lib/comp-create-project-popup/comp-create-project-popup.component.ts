/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  MembersNames:any[]=[];
  SkillsList: string[] = [];
  selectedMembers:string[]=[];
  teams:any;

  projectForm=new FormGroup({
    projectName:new FormControl('',[Validators.required]),
    manHours:new FormControl('',[Validators.required]),
  })

  SuggestedProjectForm=new FormGroup({
    SuggProjectName:new FormControl('',[Validators.required]),
    SuggProjectHours:new FormControl('',[Validators.required]),
    SuggProjectMemNumber:new FormControl('',[Validators.required]),
  })

  TeamForm=new FormGroup({
    project_Name:new FormControl('',[Validators.required]),
    projectHours:new FormControl('',[Validators.required]),
    projectMemberNumber:new FormControl('',[Validators.required]),
    projectSkills:new FormControl('',[Validators.required]),
  })

  SuggestedForm=new FormGroup({
    TeamName:new FormControl('',[Validators.required]),
  }
  )

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

      this.adminService.getSkills().subscribe(data=>{
        //
        for(const request of data.data.GetSkill)
        {
          this.SkillsList.push(request.skill)
        }
      })

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
        data1=>{

        //assign the project to the selected teams
        for(let i=0;i<this.selectedTeams.length;++i)
        {
          this.adminService.assignProjectToTeams(this.selectedTeams[i],projectName).subscribe(
          data2=>{

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

  OnGetTeam()
  {
    //
    if(this.TeamForm.valid)
    {
      const projectName=this.TeamForm.get('project_Name')?.value!;
      const projectHours=this.TeamForm.get('projectHours')?.value!;
      const projectSkill=this.TeamForm.get('projectSkills')?.value!;
      const projectMemNumber=this.TeamForm.get('projectMemberNumber')?.value!;

      this.adminService.createProject(projectName,this.companyName,"null",Number(projectHours)).subscribe(
        data=>{
          //
          this.adminService.GetRecomendedTeam(Number(projectMemNumber),projectSkill).subscribe(
            data2=>
            {
              type nameObject=
              {
                Name:string
                Surname:string
                Email:string
              }

              for(const requests of data2.data.GetRecomendedTeam)
              {
                const  obj={} as nameObject;
                obj.Name=requests.name;
                obj.Surname=requests.surname;
                obj.Email=requests.email;
                console.log(obj.Name)
                this.MembersNames.push(obj)
              }
            }
          )
        }
      )
    }
  }
}
