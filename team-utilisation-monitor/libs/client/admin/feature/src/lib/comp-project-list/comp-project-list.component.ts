import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-project-list',
  templateUrl: './comp-project-list.component.html',
  styleUrls: ['./comp-project-list.component.scss'],
})
export class CompProjectListComponent implements OnInit {
  //constructor() {}
  @Input() Project!: { Name: string, TeamName: string };

  //get Team associated with the Project from back end;

  ngOnInit(): void {
    console.log();
  }
}
