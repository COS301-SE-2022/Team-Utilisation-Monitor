import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-add-skills-popup',
  templateUrl: './comp-add-skills-popup.component.html',
  styleUrls: ['./comp-add-skills-popup.component.scss']
})
export class CompAddSkillsPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  skillsList: string[] = ['Angular', 'java Scrypt', 'Type Scrypt', 'Python', 'C++'];
}
