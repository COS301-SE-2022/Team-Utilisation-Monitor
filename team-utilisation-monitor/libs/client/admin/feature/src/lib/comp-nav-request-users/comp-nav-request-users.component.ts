import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-nav-request-users',
  templateUrl: './comp-nav-request-users.component.html',
  styleUrls: ['./comp-nav-request-users.component.scss'],
})
export class CompNavRequestUsersComponent implements OnInit {
  //constructor() {}

  @Input() IndivName!: { Name: string };

  ngOnInit(): void {
    console.log();
  }
}
