import { CookieService } from 'ngx-cookie-service';
import { IndividualService } from './../Individual.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-weekly-utilisation-graph',
  templateUrl: './weekly-utilisation-graph.component.html',
  styleUrls: ['./weekly-utilisation-graph.component.scss']
})
export class WeeklyUtilisationGraphComponent implements OnInit {

  data1:number[]=[]

  constructor(private service:IndividualService,private cookie:CookieService){}
  public lineChartLabels = ['Week 1', 'Week2', 'Week 3', 'Week 4'];
  public lineChartLegend = true;

  public lineChartData = [
    {data: this.data1,label: 'Weekly Utilization'}//[65, 59, 80, 81, 56, 55, 40], label: 'Weekly Utilization'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours Spent'}
  ];

  ngOnInit(): void {
    const dobj=new Date();
    const month=dobj.getMonth()+1
    const email=this.cookie.get("Email");
    this.service.GetMonthlyUtilization(email).subscribe(Data=>
      {


        for(const req of Data.data.GetMonthlyUtilization)
        {
          if(req.Month==month)
          {
            this.data1.push(req.Week1)
            this.data1.push(req.Week2)
            this.data1.push(req.Week3)
            this.data1.push(req.Week4)
            return
          }

        }

      }
    )



  }

}
