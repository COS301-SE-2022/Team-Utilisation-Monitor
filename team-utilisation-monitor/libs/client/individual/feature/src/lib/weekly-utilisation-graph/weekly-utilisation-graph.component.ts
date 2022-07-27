import { CookieService } from 'ngx-cookie-service';
import { IndividualService } from './../Individual.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-utilisation-monitor-weekly-utilisation-graph',
  templateUrl: './weekly-utilisation-graph.component.html',
  styleUrls: ['./weekly-utilisation-graph.component.scss']
})
export class WeeklyUtilisationGraphComponent implements OnInit {

  WeeklyOBJ:any[]=[]
  data1:number[]=[]

  constructor(private service:IndividualService,private cookie:CookieService){}
  public lineChartLabels = ['Week 1', 'Week2', 'Week 3', 'Week 4'];
  public lineChartLegend = true;

  public lineChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Weekly Utilization'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours Spent'}
  ];

  ngOnInit(): void {
    console.log();
    const dobj=new Date();
    const month=dobj.getMonth()+1
    //const email=this.cookie.get("Email");
    this.WeeklyOBJ=this.service.getData()

    for(let i=0;i<this.WeeklyOBJ.length;i++)
    {
      if(this.WeeklyOBJ[i].Month==month)
      {
        //Display the data for that particular month
        this.data1.push(this.WeeklyOBJ[i].Week1)
        this.data1.push(this.WeeklyOBJ[i].Week2)
        this.data1.push(this.WeeklyOBJ[i].Week3)
        this.data1.push(this.WeeklyOBJ[i].Week4)
      }
    }
  }



}
