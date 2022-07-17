import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-list-view-individual',
  templateUrl: './comp-list-view-individual.component.html',
  styleUrls: ['./comp-list-view-individual.component.scss'],
})
export class CompListViewIndividualComponent implements OnInit {
  //constructor() {}

  @Input() Individual!: { Name: string,Surname: string,Email:string };

  ngOnInit(): void {
    console.log();
  }

}
