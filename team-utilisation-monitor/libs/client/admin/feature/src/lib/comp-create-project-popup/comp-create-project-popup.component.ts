/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../Admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngxs/store';
import { IncreaseNumberOfProjects } from '../actions/mutate-number-of-project.action';
import { AddProject } from '../actions/mutate-add-project.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'team-utilisation-monitor-comp-create-project-popup',
  templateUrl: './comp-create-project-popup.component.html',
  styleUrls: ['./comp-create-project-popup.component.scss'],
})
export class CompCreateProjectPopupComponent implements OnInit {

  ObservableMembers$:any[]=[];
  TeamNames: string[] = [];
  selectedTeams:any[]=[]; //all the teams selected will be here
  MembersNames:any[]=[];
  SkillsList: string[] = [];
  selectedSkills:string[]=[];
  selectedMembers:string[]=[];
  panelOpenState = false;
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
  })

  SuggestedForm=new FormGroup({
    TeamName:new FormControl('',[Validators.required]),
  }
  )

  companyName='';
  tempData:any;


  constructor(private adminService:AdminService,private cookie:CookieService, private snackBar: MatSnackBar,private store:Store,private ref:ChangeDetectorRef) {}


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
        for(const request of data.data.GetSkill){
          this.SkillsList.push(request.skill)
        }
      })

    })
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.ref.detectChanges();
  }

  onGroupsChange(f_selectedTeams: any[]) {
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

          //add the project to the ngxs AddProjectState
          this.store.dispatch(new AddProject({projectName:projectName,manHours:Number(projectHours)}));

          this.snackBar.open("Project "+projectName+" has been created ")
          setTimeout(() => {this.snackBar.dismiss();}, 5000)

          this.AddTeamToProject(0,projectName); //Recursive call
      })
    }
  }

  //Recursive call for adding teams to a project
  AddTeamToProject(i:number,projectName:string)
  {
    if(i<this.selectedTeams.length)
    {
      this.adminService.assignProjectToTeams(this.selectedTeams[i],projectName).subscribe(
        data2=>{
          this.AddTeamToProject(++i,projectName);
          if(i==0)
          {
            const projectHours=this.projectForm.get('manHours')?.value!;
            this.adminService.CalculateUtilization(projectName).subscribe(Data=>{
              this.snackBar.open(Data.data.CalculateUtilization)
              setTimeout(() => {this.snackBar.dismiss();}, 5000)

              this.adminService.getCompanyStats(this.companyName).subscribe(data2=>{
                console.log(data2.data.getCompanyStats.numProjects);
                this.store.dispatch(new IncreaseNumberOfProjects({value:data2.data.getCompanyStats.numProjects+1}));
              })
            })
          }
      });
    }
    else
    {
        return;
    }
  }

  OnGetTeam()
  {
    //
    if(this.TeamForm.valid)
    {
      const projectName=this.TeamForm.get('project_Name')?.value!;
      const projectHours=this.TeamForm.get('projectHours')?.value!;
      const projectMemNumber=this.TeamForm.get('projectMemberNumber')?.value!;


      this.adminService.createProject(projectName,this.companyName,"null",Number(projectHours)).subscribe(
        async data=>{
          console.log(await this.CallAddMembers(this.selectedSkills.length-1,Number(projectMemNumber)))

        }
      )
    }
  }

 async CallAddMembers(i:number,projectMemNumber:number):Promise<any>
  {
    if(i>=0)
    {
      this.adminService.GetRecomendedTeam(Number(projectMemNumber),this.selectedSkills[i]).subscribe(
        data2=>
        {
          type nameObject=
          {
            Name:string
            Surname:string
            Email:string
            Project_Points:number
          }

          for(const requests of data2.data.GetRecomendedTeam)
          {
            const  obj={} as nameObject;
            obj.Name=requests.name;
            obj.Surname=requests.surname;
            obj.Email=requests.email;
            obj.Project_Points=requests.project_points
            console.log(obj.Name)
            this.MembersNames.push(obj)
          }

          //console.log("Less Go")
          this.CallAddMembers(--i,projectMemNumber);
        }
      )
    }
    else
    {
      const UniqueArray=[...new Map(this.MembersNames.map(v => [v.Email, v])).values()]  //Removes duplicats
      this.MembersNames=[];
      for(let i=0;i<UniqueArray.length;i++)
      {
        //
        this.MembersNames.push(UniqueArray[i]);
        if(i==UniqueArray.length-1) //Last element added
        {
          const projectMemNumber=Number(this.TeamForm.get('projectMemberNumber')?.value!);
          this.MembersNames=(this.MembersNames.sort((a,b)=>(a.Project_Points>b.Project_Points)? 1:-1).reverse())
          if(this.MembersNames.length>projectMemNumber) //More people than we want so we filter based on Project_Points
          {
            this.MembersNames.splice(projectMemNumber)
          }

        }
      }
      return "Im done"
    }
  }

  CreateTeam()
  {
    if(this.SuggestedForm.valid)
    {
      const TeamName=this.SuggestedForm.get('TeamName')?.value!;
      this.adminService.createTeam(TeamName,this.companyName).subscribe(async data4=>
        {
          //
          console.log("The number of memebers selected is "+this.MembersNames.length)
          console.log(await this.AddTeamMembers(this.MembersNames.length-1,TeamName))
        })
    }
  }

  async AddTeamMembers(i:number,TeamName:string):Promise<any>
  {
    if(i>=0)
    {
      console.log(this.MembersNames[i].Email)
      this.adminService.AddTeamMember(TeamName,this.MembersNames[i].Email).subscribe(data5=>
      {
        console.log("Team created");
        this.AddTeamMembers(--i,TeamName);
      })
    }
    else
    {
      const projectName=this.TeamForm.get('project_Name')?.value!;
      this.adminService.assignProjectToTeams(TeamName,projectName).subscribe(data=>
        {
          this.snackBar.open("Project "+projectName+" has been created ")
          setTimeout(() => {
          this.snackBar.dismiss();
          }, 5000)

          return "done"
        })

    }
  }

}
