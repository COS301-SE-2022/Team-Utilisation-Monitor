import { CookieService } from 'ngx-cookie-service';
import { AdminService } from './../Admin.service';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-add-user-popup',
  templateUrl: './comp-add-user-popup.component.html',
  styleUrls: ['./comp-add-user-popup.component.scss'],
})
export class CompAddUserPopupComponent implements OnInit {
  companyName=''
  inviteCode=""
  constructor(private service:AdminService,private cookie:CookieService) {}

  ngOnInit(): void {
    console.log();
    this.companyName=this.cookie.get("CompanyName");
    this.service.getInviteCode(this.companyName).subscribe(data=>
    {
      this.inviteCode=data.data.getInviteCode
      console.log(this.inviteCode)
    })
  }
}
