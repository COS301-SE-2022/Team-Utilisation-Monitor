import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-project-list',
  templateUrl: './comp-project-list.component.html',
  styleUrls: ['./comp-project-list.component.scss'],
})
export class CompProjectListComponent implements OnInit {
  //constructor() {}
  @Input() ProjectName!: { Name: string };

  //get Team associated with the Project from back end;
  TeamName = "I Create Software";

  OutEmployeeName = [{Name: "Mr Cornel Coetzee"},
  {Name: "Mr Gift Monwa"},
  {Name: "Mr Rourke Amiss"},
  {Name: "Mr Agape Mamphasa"},
  {Name: "Mr Agape Mamphasa"},
  ];

  ngOnInit(): void {
    console.log();
  }
}
