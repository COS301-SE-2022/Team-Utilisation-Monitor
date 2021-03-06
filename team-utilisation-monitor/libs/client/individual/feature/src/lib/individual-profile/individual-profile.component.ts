/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { IndividualService } from '../Individual.service';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'team-utilisation-monitor-individual-profile',
  templateUrl: './individual-profile.component.html',
  styleUrls: ['./individual-profile.component.scss']
})
export class IndividualProfileComponent implements OnInit {

  profileForm=new FormGroup({
    first_name:new FormControl(''),
    last_name:new FormControl(''),
  });

  //The requested form control for skills
  skillForm=new FormGroup({
    skill_name: new FormControl('')
    }
  );

  constructor(private readonly cookies:CookieService,private readonly service:IndividualService){}

  events: string[] = [];
  opened = true;
  address="string";
  result = <unknown> Observable;


  boolshow = true;
  currSkills: string[]=['UX designing', 'UI Designing', 'unit testing', 'e2e testing', 'unit testing', 'e2e testing'];
  newSkills: string[]=['C++', 'Debugger','Front-end','Backend','C#','Database'];
  projects: string[]=['Taint C&S', 'Community', 'WebDev'];
  fName= "Faresa";
  lastName="Thane";
  email="gift@gmail.co.za";
  team="none";

  noOfProject=this.projects.length;
  companyName=""
  panelOpenState = false;

  ngOnInit(): void {
    console.log();

    const email=this.cookies.get("Email");
    this.companyName=this.cookies.get("CompanyName");

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

  UpdateProfile()
  {
    const first_name=this.profileForm.get('first_name')?.value!;
    const last_name=this.profileForm.get("last_name")?.value!;
    //const skill_name=this.profileForm.get('')
    console.log(this.email)
    this.service.UpdateProfile(this.email,first_name,last_name,"Driving").subscribe(Result=>
      {
        console.log(Result.data)
      })
  }

}
