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
import { RemoveSkill } from '../actions/mutate-remove-skill.action';

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

  selectedSkills:string[]=[];
  

  addSkillForm=new FormGroup({
    skillName:new FormControl('',[Validators.required])
  });

  constructor(private service:AdminService, private snackBar: MatSnackBar,private store:Store) { }

  ngOnInit(): void {

    this.service.getSkills().subscribe(data=>{
      this.skillsData=data;

      for(let i=0;i<this.skillsData.data.GetSkill.length;++i)
      {
        this.skillsList[i]=this.skillsData.data.GetSkill[i].skill;
      }
    })



    this.skills$.subscribe((data: any)=>{

      if(data!=null && data.length>0)
      {
        for(let i=0;i<data.length;++i){
          this.skillsList.push(data[i].skillName)
        }

        //dump the contents of the store

        for(let i=0;i<data.length;++i){
          this.store.dispatch(new RemoveSkill({skillName:data[i].skillName}));
        }
      }

     
    })    
  }

  //test function
  func(skill:string){
    console.log("In func()");
    console.log(skill);
    console.log(this.selectedSkills);
  }

  AddSkill()
  {
    if(this.addSkillForm.get('skillName')?.value)
    {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const skillName=this.addSkillForm.get('skillName')?.value!;
      

      this.store.dispatch(new AddSkill({skillName:skillName}));

      this.service.AddSkill(skillName).subscribe(data=>{
          this.snackBar.open(data.data.AddSkill+" Added");
          setTimeout(() => {
            this.snackBar.dismiss();
          }, 1000)
        }
      )
    }
    else
    {
      this.snackBar.open("Please enter a valid skill to Add");
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000)
    }
  }

  removeSkill()
  {
    if(this.selectedSkills.length>0){

      let out="";
      let counter=0;

      for(let i=0;i<this.selectedSkills.length;++i)
      {
        this.service.removeSkill(this.selectedSkills[i]).subscribe(item=>{
          
          if(item.data.removeSkill){
            ++counter;
          }

          if(this.selectedSkills.length==counter){

            while(counter>0){
              for(let k=0;k<this.skillsList.length;++k){
                if(this.skillsList[k]==this.selectedSkills[counter-1]){
                  
                  out=out+this.skillsList[k]+", ";
                  this.skillsList.splice(k,1);
                }
              }
              --counter;
            }

            this.snackBar.open("Removed Position(s) "+out);
            setTimeout(() => {
            this.snackBar.dismiss();
            }, 3000)

            this.selectedSkills=[];

          }

        
        })
      }
    }
  }

  


}
