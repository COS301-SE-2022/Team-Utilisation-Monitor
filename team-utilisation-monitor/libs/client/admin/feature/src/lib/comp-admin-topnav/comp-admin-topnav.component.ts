import { Component, OnInit ,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-admin-topnav',
  templateUrl: './comp-admin-topnav.component.html',
  styleUrls: ['./comp-admin-topnav.component.scss'],
})
export class CompAdminTopnavComponent implements OnInit {
  constructor() {
    this.state = true;
  }
  
  @Input() state: boolean;  //imported boolean from parent class
  @Output() toggle = new EventEmitter();

  toggleSide() {
    if (this.state == true) {
      this.state = false;
      this.toggle.emit(this.state);   //toggles boolean in parent calss
    } else {
      this.state = true;
      this.toggle.emit(this.state);   //toggles boolean in parent calss
    }
  }

  ngOnInit(): void {
    console.log();
  }
}
