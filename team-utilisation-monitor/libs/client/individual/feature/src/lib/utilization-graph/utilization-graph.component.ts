import { IndividualService } from './../Individual.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
//import { ChartsModule } from 'ng2-charts/ng2-charts';

@Component({
  selector: 'team-utilisation-monitor-utilization-graph',
  templateUrl: './utilization-graph.component.html',
  styleUrls: ['./utilization-graph.component.scss']
})
export class UtilizationGraphComponent implements OnInit {

  constructor(private service:IndividualService,private cookie:CookieService){}
  Data1:number[]=[]
  YearlyOBJ:any[]=[]

  lineChartLabel:number[]=[]

  public lineChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public lineChartLegend = true;


  public lineChartData = [
    {data: this.Data1,label:'Utilization'}//[65, 59, 80, 81, 56, 55, 40], label: 'Utilization'},
    //{data: [28, 48, 40, 19, 86, 27, 90], label: 'Hours'}
  ];
  ngOnInit() {
    console.log();

    const email=this.cookie.get("Email");
    this.service.GetMonthlyUtilization(email).subscribe(Data=>
      {
        type MonthObject=
        {
          Week1:number;
          Week2:number;
          Week3:number;
          Week4:number;
          AVG:number;
          Month:string;
        }

        for(const req of Data.data.GetMonthlyUtilization)
        {
          const obj={} as MonthObject;
          obj.Week1=req.Week1;
          obj.Week2=req.Week2;
          obj.Week3=req.Week3;
          obj.Week4=req.Week4;
          obj.AVG=req.Average;
          obj.Month=req.Month;
          this.YearlyOBJ.push(obj);
        }

        //Sort the object in ascending order
        this.YearlyOBJ.sort((a:MonthObject,b:MonthObject)=>
        {
          return a.Month>b.Month ?1:-1
        })

        for(let i=0;i<this.YearlyOBJ.length;i++)
        {
          this.Data1.push(this.YearlyOBJ[i].AVG)
          console.log(this.YearlyOBJ[i].AVG)
        }

        this.service.storeData(this.Data1);

      }
    )
  }


}
