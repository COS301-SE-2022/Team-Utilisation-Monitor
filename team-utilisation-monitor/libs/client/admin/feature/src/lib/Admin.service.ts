import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  company:any
  constructor(private http:HttpClient){

  }

  getCompany(companyName:string)
  {
    const Query='query{GetCompanyQuery(name:"iCreateSoftware"){id,company_name,employees{name,surname},admins{name,surname},projects{project_name}}}'
    this.http.post<any>("https://localhost:3333/graphql",JSON.stringify({ query: Query})).subscribe(data=>
    {
      this.company=data;
    })
  }
  getAdmins(companyName:string)
  {
    //
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
