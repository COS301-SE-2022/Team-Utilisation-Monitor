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

  getCompany(companyName:string):Observable<any>
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

  getCompanyStats(companyName: string):Observable<any>
  {
      const query='query{getCompanyStats(company_name:"'+companyName+'"){numTeams,numAdmins,numProjects,numEmployees}}'
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  createTeam(teamName:string,companyName:string)
  {
    const query='mutation{createTeam(team_name:"'+teamName+'",company_name:"'+companyName+'"){members{name}}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }


  createInviteCode(companyName: string):Observable<any>
  {
    const query='mutation{createInviteCode(company_name:"'+companyName+'"){inviteCode}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }
}
