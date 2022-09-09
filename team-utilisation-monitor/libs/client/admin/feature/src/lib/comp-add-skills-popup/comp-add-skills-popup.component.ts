/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { AdminService } from './../Admin.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Select, Store } from '@ngxs/store';
import { AddSkill } from '../actions/mutate-add-skill.action';
import { Observable } from 'rxjs';
import { Skill } from '../models/admin-skill';
import { AddSkillState } from '../states/skills.state';

@Component({
  selector: 'team-utilisation-monitor-comp-add-skills-popup',
  templateUrl: './comp-add-skills-popup.component.html',
  styleUrls: ['./comp-add-skills-popup.component.scss']
})
export class CompAddSkillsPopupComponent implements OnInit {

  @Select(AddSkillState.getSkills)skills$!:Observable<Skill[]>;

  skillsList: string[] = [];
  skillsData:any;
  skillName:any;
  

  addSkillForm=new FormGroup({
    skillName:new FormControl('',[Validators.required])
  });

  constructor(private service:AdminService, private snackBar: MatSnackBar,private store:Store) { }

  ngOnInit(): void {
    this.skills$.subscribe((data: any)=>{
      for(let i=0;i<data.length;++i){
        if(!this.checkDuplicateSkill(data[i].skillName))
          this.skillsList.push(data[i].skillName);
      }
    })    
  }

  checkDuplicateSkill(skill:string):boolean{
    for(let i=0;i<this.skillsList.length;++i){
      if(this.skillsList[i]==skill){
        return true; //duplicate
      }
    }
    return false; //no duplicate skill
  }

  AddSkill()
  {
    if(this.addSkillForm.get('skillName')?.value)
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skillName=this.addSkillForm.get('skillName')?.value!;
      //this.skillsList.push(skillName);

      this.store.dispatch(new AddSkill({skillName:skillName}));

      this.service.AddSkill(skillName).subscribe(data=>{
          this.snackBar.open(data.data.AddSkill+" Added");
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 5000)
        }
      )
    }
    else
    {
      this.snackBar.open("Please enter a valid skill to Add");
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 5000)
    }
  }

  


}
