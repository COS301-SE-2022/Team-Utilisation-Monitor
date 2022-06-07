import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  company:any
  constructor(private client:HttpClient){

  }

  getCompany(companyName:string)
  {
    const Query='query{GetCompanyQuery(name:"iCreateSoftware"){id,company_name,employees{name,surname},admins{name,surname},projects{project_name}}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }
  this.client.post<any>("https://localhost:3333/graphql",JSON.stringify({ query: Query}),options).subscribe(data=>
    {
      this.company=data;
    })

    return this.company;
  }

  getAdmins(companyName:string)
  {
    //const
  }

  getEmployees(companyName:string) //:Observable<any>
  {
    //
  }

  getNumProjects(companyName:string)
  {
    //
  }

  getPendingRequests(componygName:string)
  {
    //
  }


}
