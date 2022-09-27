/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-completed-projects-list',
  templateUrl: './comp-completed-projects-list.component.html',
  styleUrls: ['./comp-completed-projects-list.component.scss']
})
export class CompCompletedProjectsListComponent implements OnInit {

  constructor() { }

  @Input() CompletedProjects!:{projectName:string, manHours:number};

  ngOnInit(): void {
    console.log()
  }

}
