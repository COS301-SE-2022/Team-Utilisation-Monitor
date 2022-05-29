import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  events: string[] = [];
  opened = true;

  ngOnInit(): void {
    console.log();
  }
}
