import { CookieService } from 'ngx-cookie-service';
import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-nav-request-users',
  templateUrl: './comp-nav-request-users.component.html',
  styleUrls: ['./comp-nav-request-users.component.scss'],
})
export class CompNavRequestUsersComponent implements OnInit {
  constructor(private service:AdminService) {
    console.log()
  }

  @Input() IndivName!: { Name: string,Email:string };

  ngOnInit(): void {
    console.log();
  }

  approveRequest(email:string)
  {
    console.log(email)
    this.service.approveRequest(email).subscribe(data=>
      {
        console.log(data.data.approveRequestVEmail)
      })
  }
}
