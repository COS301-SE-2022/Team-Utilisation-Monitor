import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-employee-individual',
  templateUrl: './comp-employee-individual.component.html',
  styleUrls: ['./comp-employee-individual.component.scss'],
})
export class CompEmployeeIndividualComponent implements OnInit {
  constructor(private service:AdminService) {}

  @Input() IndivName!: { Name: string ,Surname:string,Email:string,TeamName:string};

  ngOnInit(): void {
    console.log();
  }

  DeleteMember(teamName:string,email:string)
  {
    this.service.DeleteTeamMember(teamName,email).subscribe(data=>{
      console.log(data.data)
    })
  }
}
