import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IndividualService } from '../Individual.service';

@Component({
  selector: 'team-utilisation-monitor-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent implements OnInit {


  constructor(private readonly cookies:CookieService,private readonly service:IndividualService){}

  events: string[] = [];
  opened = true;
  address="string";
  result = <unknown> Observable;


  boolshow = true;
  members: string[]=['Agape A', 'Ndivhuho B','Gift B','Cornel C','Faresa F','Rourke C', 'Ndivhuho B','Gift B','Cornel C','Faresa F','Rourke C'];
  skills: string[]=['C++', 'Debugger','Front-end','Backend','C#','Database'];
  projects: string[]=['Taint C&S', 'Community', 'WebDev'];
  fName= "Faresa";
  lastName="Thane";
  email="gift@gmail.co.za";
  team="none";

  noOfProject=this.projects.length;
  panelOpenState = false;

  ngOnInit(): void {
    console.log();

    const email=this.cookies.get("Email");

    this.result=this.service.getPersonDetails(email).subscribe({
      next:(item)=>{

        if(item.data!=null)
        {
          this.fName=item.data.getOnePerson.name;
          this.lastName=item.data.getOnePerson.surname;
          this.email=item.data.getOnePerson.email;

          if(item.data.getOnePerson.team_name!=null)
            this.team=item.data.getOnePerson.team_name;
        }
        else{
          alert("Something went wrong. Failed to load content");
        }
      },
      error: (err) => { console.log(err); }
    })






  }

  showInfo(link: string) {
    console.log()
  }

}
