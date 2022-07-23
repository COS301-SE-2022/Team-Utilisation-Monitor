import { CookieService } from 'ngx-cookie-service';
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Admin.service';

@Component({
  selector: 'team-utilisation-monitor-comp-create-project-popup',
  templateUrl: './comp-create-project-popup.component.html',
  styleUrls: ['./comp-create-project-popup.component.scss'],
})
export class CompCreateProjectPopupComponent implements OnInit {

  TeamNames: string[] = [];
  selectedTeams:string[]=[]; //all the teams selected will be here
  projects:any;

  projectForm=new FormGroup({
    projectName:new FormControl('',[Validators.required]),
    manHours:new FormControl('',[Validators.required]),
  })

  companyName='';
  

  constructor(private adminService:AdminService,private cookie:CookieService) {}

  
  ngOnInit(): void {
    this.companyName=this.cookie.get("CompanyName");
    this.adminService.getAllProjectsOfACompany(this.companyName).subscribe(data=>{
      
      this.projects=data;

      //console.log(this.projects.data.getAllProjectsOfACompany.length);

      for(let i=0;i<this.projects.data.getAllProjectsOfACompany.length;++i)
      {
        //get each individual element
        this.TeamNames.push(this.projects.data.getAllProjectsOfACompany[i].project_name)
      }

    })
  }

  onGroupsChange(selectedPizzas: string[]) {
    console.log(selectedPizzas);
  }

  onSubmit()
  {
    
    if(this.projectForm.valid)
    {
      const projectName=this.projectForm.get('projectName')?.value!;
      const teamName=this.projectForm.get('teamName')?.value!;
      const projectHours=this.projectForm.get('manHours')?.value!;

      

      /*
        this.adminService.createProject(projectName,this.companyName,teamName,Number(projectHours)).subscribe(
          ()=>{
            alert("Project "+projectName+" has been created")
          }
        )*/

      this.adminService.bridgeCreateProject(projectName,this.companyName,Number(projectHours),this.selectedTeams);

    }
  }
}
