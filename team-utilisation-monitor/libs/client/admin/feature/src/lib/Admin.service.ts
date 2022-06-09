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


  //GET FUNCTIONS
  getCompany(companyName:string):Observable<any>
  {
    const Query='query{GetCompanyQuery(name:"'+companyName+'"){id,company_name,employees{name,surname},admins{name,surname},projects{project_name}}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }

    return this.client.post<any>("http://localhost:3333/graphql",JSON.stringify({ query: Query}),options)
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
    console.log()

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
  getPendingRequests(companyName:string):Observable<any>
  {
    const query='query{getPendingRequests(company_name:"'+companyName+'"){name,surname,email}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }




  //MUTATIONS

  createTeam(teamName:string,companyName:string):Observable<any>
  {
    const query='mutation{createTeam(team_name:"'+teamName+'",company_name:"'+companyName+'"){members{name}}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
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

  createProject(projectName:string,companyName:string,teamName:string,manHours:number)
  {
    const query='mutation{createProject(project_name:"'+projectName+'",company_name:"'+companyName+'",team_name:"'+teamName+'",man_hours:'+manHours+'){man_hours}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

}
