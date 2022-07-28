import { AdminService } from './../Admin.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-comp-employee-individual',
  templateUrl: './comp-employee-individual.component.html',
  styleUrls: ['./comp-employee-individual.component.scss'],
})
export class CompEmployeeIndividualComponent implements OnInit {
  constructor(private service:AdminService) {}

  /*
  menueOption will display in the options menue in the Admin Company View next to the delete button

  (Message for gift)
  add an if statement
    if (user == admin) menueOption = "Demote to Employee"
    if (user == employee) menueOption = "Promote to Admin"

  */
  menueOption = "Promote to admin";
  hours=0;

  @Input() IndivName!: { Name: string ,Surname:string,Email:string,Role:string};

  ngOnInit(): void {
    console.log();
  }

  updateWeeklyHours(email:string){
    //console.log(email+" "+this.hours);
    this.service.updateWeeklyHoursForEmployee(email,this.hours).subscribe(
      data=>{
        alert("Updated "+this.IndivName.Name+"'s hours");
        console.log(data);
      }
    )
  }

  DeleteEmployee(email:string)
  {
    console.log(this.IndivName.Email);
    this.service.DeleteEmployee(email).subscribe(data=>{
      alert(data.data.DeleteEmployee.name+" Removed from Company")
    })
  }
}
