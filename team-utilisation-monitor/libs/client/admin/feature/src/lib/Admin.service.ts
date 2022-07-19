import { Query } from '@nestjs/graphql';
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
    const Query='query{GetCompanyQuery(name:"'+companyName+'"){id,company_name,employees{name,surname},admins{name,surname},teams{team_name},projects{project_name,team_name}}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
  }

    return this.client.post<any>("http://localhost:3333/graphql",JSON.stringify({ query: Query}),options)
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

  getInviteCode(companyName:string):Observable<any>
  {
    const query='query{getInviteCode(name:"'+companyName+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  getTeamMembers(teamName:string):Observable<any>
  {
    const Query='query{GetTeamMembers(team_name:"'+teamName+'"){name,surname,email}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
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

  approveRequest(employeeEmail:string):Observable<any>
  {
    const Query='mutation{approveRequestVEmail(email:"'+employeeEmail+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  AddTeamMember(teamName:string,email:string):Observable<any>
  {
    const Query='mutation{AddTeamMember(team_name:"'+teamName+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  DeleteTeamMember(teamName:string,email:string):Observable<any>
  {
    const Query='mutation{DeleteTeamMember(team_name:"'+teamName+'",email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  DeleteEmployee(email:string):Observable<any>
  {
    const Query='mutation{DeleteEmployee(email:"'+email+'"){name,surname}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  AddSkill(skillName:string):Observable<any>
  {
    const Query='mutation{AddSkill(skillType:"'+skillName+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  //getSkills()

}
