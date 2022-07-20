import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-team-individual',
  templateUrl: './comp-team-individual.component.html',
  styleUrls: ['./comp-team-individual.component.scss']
})
export class CompTeamIndividualComponent implements OnInit {

  @Input() IndivName!: { Name: string ,Surname:string,Email:string,TeamName:string};
  
  constructor() { }

  ngOnInit(): void {
  }

  RemoveFromTeam(teamName:string,email:string)
  {

  }
}
