import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-employee-individual',
  templateUrl: './comp-employee-individual.component.html',
  styleUrls: ['./comp-employee-individual.component.scss'],
})
export class CompEmployeeIndividualComponent implements OnInit {
  //constructor() {}

  @Input() IndivName!: { Name: string };

  ngOnInit(): void {
    console.log();
  }
}
