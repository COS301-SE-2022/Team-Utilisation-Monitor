/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { AdminService } from './../Admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'team-utilisation-monitor-comp-add-skills-popup',
  templateUrl: './comp-add-skills-popup.component.html',
  styleUrls: ['./comp-add-skills-popup.component.scss']
})
export class CompAddSkillsPopupComponent implements OnInit {

  addSkillForm=new FormGroup({
    skillName:new FormControl('',[Validators.required])
  });

  skillsList: string[] = ['Angular', 'java Scrypt', 'Type Scrypt', 'Python', 'C++'];
  skillsData:any
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    console.log
    ()
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

      this.service.AddSkill(skillName).subscribe(data=>
        {
          alert(data.AddSkill)
        })
    }
  }


}
