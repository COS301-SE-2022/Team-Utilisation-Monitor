import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-owner-individual',
  templateUrl: './comp-owner-individual.component.html',
  styleUrls: ['./comp-owner-individual.component.scss'],
})
export class CompOwnerIndividualComponent implements OnInit {
  //constructor() {}
  @Input() IndivName!: string;

  ngOnInit(): void {
    console.log();
  }
}
