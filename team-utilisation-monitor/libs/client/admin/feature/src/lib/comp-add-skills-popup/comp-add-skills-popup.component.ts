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
  constructor(private service:AdminService) { }

  ngOnInit(): void {
    console.log
    ()
  }


}
