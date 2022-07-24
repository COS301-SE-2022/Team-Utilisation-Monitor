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

  selectedSkill:string[]=[];
  skillN:string[]=[];


  boolshow = true;
  currSkills: string[]=['UX designing', 'UI Designing', 'unit testing', 'e2e testing', 'unit testing', 'e2e testing'];

  newSkills: string[]=['UX designing', 'C++', 'Debugger','Front-end','Backend','C#','Database'];
  fName= "Faresa";
  lastName="Thane";
  email="gift@gmail.co.za";
  team="none";
  utilization=0;

  noOfProject=0//this.projects.length;
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

  this.service.getSkills().subscribe(data=>{
    //
    for(const request of data.data.GetSkill)
    {
      this.newSkills.push(request.skill)
    }
  })

  this.service.getUserSkills(email).subscribe(Data=>
    {
      for(const req of Data.data.GetUserSkills)
      {
        this.currSkills.push(req)
      }

      for(let i=0, v=0;i<this.selectedSkill.length, v<this.currSkills.length;++i, ++v){
        //
      }
    })

    this.service.getUserStats(email).subscribe(Data=>
      {
        this.noOfProject=Data.data.GetUserStats.numberOfProjects
        this.utilization=Data.data.GetUserStats.utilisation
      })
  }

  showInfo(link: string) {
    console.log()
  }

  onGroupsChange(f_selectedSkills: string[]) {
    console.log(f_selectedSkills);
  }

  UpdateProfile()
  {
    const first_name=this.profileForm.get('first_name')?.value!;
    const last_name=this.profileForm.get("last_name")?.value!;
    const skill_name=this.profileForm.get("skill_name")?.value!;

    if(first_name==null )
    {
      this.service.UpdateProfile(this.email,this.fName,last_name).subscribe(Result=>
      {
        console.log(Result.data)
      })
    }

    if(last_name==null )
    {
      this.service.UpdateProfile(this.email,this.fName,this.lastName).subscribe(Result=>
      {
        console.log(Result.data)
      })
    }

    if(first_name==null && last_name==null){
      //call the function for skills only
      this.service.UpdateProfile(this.email,this.fName,this.lastName).subscribe(Result=>
        {
          console.log(Result.data)
        })
    }

    if( first_name!=null && last_name!=null){
      this.service.UpdateProfile(this.email,first_name,last_name).subscribe(Result=>
      {
        console.log(Result.data)
      })
    }

    for(let i=0;i<this.selectedSkill.length;++i) {
      this.service.UpdateUserSkill(this.email,this.selectedSkill[i]).subscribe(Result=>
       {
             console.log(Result.data)
        });
     }
  }
}
