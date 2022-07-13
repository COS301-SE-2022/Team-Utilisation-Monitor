import { AdminService } from './../Admin.service';
import { Component, OnInit ,Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-add-team-member-popup',
  templateUrl: './comp-add-team-member-popup.component.html',
  styleUrls: ['./comp-add-team-member-popup.component.scss'],
})
export class CompAddTeamMemberPopupComponent implements OnInit {

  constructor(private service:AdminService) {}

  @Input() TeamName!: { Name: string };

  AddTeamMember(teamName:string,EmployeeEmail:string)
  {
    //this.service.
  }

  ngOnInit(): void {
    console.log()
  }
}
