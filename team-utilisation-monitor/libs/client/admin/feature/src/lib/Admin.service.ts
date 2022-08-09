import { Query } from '@nestjs/graphql';
import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { query } from '@angular/animations';

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
    const Query='query{GetCompanyQuery(name:"'+companyName+'"){id,company_name,employees{name,surname,email,role,utilisation,weekly_Hours},admins{name,surname,email,role},teams{team_name},projects{project_name,man_hours}}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })}

    return this.client.post<any>("http://localhost:3333/graphql",JSON.stringify({ query: Query}),options)
  }


  getCompanyStats(companyName: string):Observable<any>
  {
      const query='query{getCompanyStats(company_name:"'+companyName+'"){numTeams,numAdmins,numProjects,numEmployees,Utilization}}'
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

  getAllTeamsOfACompany(companyName:string):Observable<any>
  {
    const Query='query{getAllTeamsOfACompany(company_name:"'+companyName+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

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

  GetUnderUtilizedEmps(cName:string):Observable<any>
  {
    const Query='query{GetUnderUtilizedEmployees(company_name:"'+cName+'"){name,surname,email,role}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getSkills():Observable<any>
  {
    const Query='query{GetSkill{skill}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getAvailableTeams(projectName:string):Observable<any>
  {
    const Query='query{GetAvailableTeams(project_name:"'+projectName+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  getAllProjectsOfACompany(companyName:string):Observable<any>
  {
    const Query='query{getAllProjectsOfACompany(company_name:"'+companyName+'"){project_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }

  /***
   * This function returns all the teams currently working of the project.
   * returns an array of [TeamEntity]
   *
   */
  getAllTeamsWorkingOnAProject(projectName:string):Observable<any>
  {
    const query='query{getAllTeamsWorkingOnProject(project_name:"'+projectName+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

  }

  GetCompanyUtilization():Observable<any>
  {
    const query='query{GetCompanyUtilization{JAN,FEB,MAR,APR,MAY,JUN,JUL,AUG,SEP,OCT,NOV,DEC,Utilisation}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  GetTeamsOnProject(projectName:string):Observable<any>
  {
    const query='query{GetTeamsOnProject(project_name:"'+projectName+'"){team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
  }

  //MUTATIONS

  assignProjectToTeams(teamName:string,projectName:string):Observable<any>
  {
    const query='mutation{assignProjectToTeamVName(team_name:"'+teamName+'",project_name:"'+projectName+'")}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

  }

  createTeam(teamName:string,companyName:string):Observable<any>
  {
    const query='mutation{createTeam(team_name:"'+teamName+'",company_name:"'+companyName+'"){members{id,name}}}'
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

  CalculateUtilization(projectName:string):Observable<any>
  {
    const Query='mutation{CalculateUtilization(project_Name:"'+projectName+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }


  updateWeeklyHoursForEmployee(email:string,hours:number):Observable<any>
  {
    const Query='mutation{AssignHours(email:"'+email+'",weekly_hours:'+hours+')}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  CompleteProject(projectName:string):Observable<any>
  {
    const Query='mutation{CompleteProject(project_name:"'+projectName+'")}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  DeleteProject(projectName:string):Observable<any>
  {
    const Query='mutation{DeleteProject(project_name:"'+projectName+'")}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

}
