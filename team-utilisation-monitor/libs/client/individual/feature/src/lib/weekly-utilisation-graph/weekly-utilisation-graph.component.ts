import { CookieService } from 'ngx-cookie-service';
import { IndividualService } from './../Individual.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-weekly-utilisation-graph',
  templateUrl: './weekly-utilisation-graph.component.html',
  styleUrls: ['./weekly-utilisation-graph.component.scss']
})
export class WeeklyUtilisationGraphComponent implements OnInit {

  //constructor() { }
  constructor(private service:IndividualService,private cookie:CookieService){}
  public lineChartLabels = ['Week 1', 'Week2', 'Week 3', 'Week 4'];
  public lineChartLegend = true;

  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Weekly Utilization'},
    {data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours Spent'}
  ];

  ngOnInit(): void {
    console.log();
    const dobj=new Date();
    const month=this.getMonth(dobj.getMonth()+1)
    const email=this.cookie.get("Email");
    this.service.GetMonthlyUtilization(email).subscribe(Data=>
      {
        //
        for(const req in Data.data.GetMonthlyUtilization)
        {
          //
          //if(req.Month==month)
        }
      }
    )
  }

  getMonth(month:number)
    {
      if(month==1)
      {
        return "JAN"
      }
      else if(month==2)
      {
        return "FEB"
      }
      else if(month==3)
      {
        return "MAR"
      }
      else if(month==4)
      {
        return "APR"
      }
      else if(month==5)
      {
        return "MAY"
      }
      else if(month==6)
      {
        return "JUN"
      }
      else if(month==7)
      {
        return "JUL"
      }
      else if(month==8)
      {
        return "AUG"
      }
      else if(month==9)
      {
        return "SEP"
      }
      else if(month==10)
      {
        return "OCT"
      }
      else if(month==11)
      {
        return "NOV"
      }
      else
      {
        return "DEC"
      }
    }

}
