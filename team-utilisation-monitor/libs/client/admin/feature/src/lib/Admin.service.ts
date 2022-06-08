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
  this.company=this.client.post<any>("https://localhost:3333/graphql",JSON.stringify({ query: Query}),options)

    return this.company;
  }

  login(email:string,password:string):Observable<any>
  {
    const query='query{login(email:"'+email+'",password:"'+password+'"){name}}';

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    const obj= this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
    console.log()
    return obj;

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
