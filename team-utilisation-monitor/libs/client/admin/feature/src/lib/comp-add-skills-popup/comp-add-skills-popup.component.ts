/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { AdminService } from './../Admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'team-utilisation-monitor-comp-add-skills-popup',
  templateUrl: './comp-add-skills-popup.component.html',
  styleUrls: ['./comp-add-skills-popup.component.scss']
})
export class CompAddSkillsPopupComponent implements OnInit {

  addSkillForm=new FormGroup({
    skillName:new FormControl('',[Validators.required])
  });

  skillsList: string[] = [];
  skillsData:any
  constructor(private service:AdminService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    console.log()
    this.service.getSkills().subscribe(data=>
      {
        this.skillsData=data

        for(const requests of this.skillsData.data.GetSkill)
        {
          this.skillsList.push(requests.skill)
        }
      })
  }

  AddSkill()
  {
    if(this.addSkillForm.get('skillName')?.value)
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skillName=this.addSkillForm.get('skillName')?.value!;
      this.skillsList.push(skillName);

      this.service.AddSkill(skillName).subscribe(data=>
        {
          this.snackBar.open(data.data.AddSkill+" Added");
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 5000)
        })
    }
    else
    {
      this.snackBar.open("Please type a valid skill name");
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
      //alert("Please type in a skill")
    }
  }


}
