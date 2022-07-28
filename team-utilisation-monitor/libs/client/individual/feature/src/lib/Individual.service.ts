import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(private client:HttpClient){}

  earlyOBJ:any

  //QUERIES
  getPersonDetails(email:string):Observable<any>
  {
    const query='query{getOnePerson(email:"'+email+'"){id,name,surname,email,company_name,role,approved,team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object= this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

    return object;

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

  getAllocatedTeams(email:string):Observable<any>
  {
    const Query='query{GetAllocatedTeams(email:"'+email+'"){team_name}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getAllocatedProjects(email:string):Observable<any>
  {
    const Query='query{GetAllocateProjects(email:"'+email+'"){project_name}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getUserSkills(email:string):Observable<any>
  {
    const Query='query{GetUserSkills(email:"'+email+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  getUserStats(email:string):Observable<any>
  {
    const Query='query{GetUserStats(email:"'+email+'"){numberOfTeams,numberOfSkills,numberOfProjects,utilisation}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }


  //Mutations
  UpdateProfile(email:string,name:string,surname:string):Observable<any>
  {
    const Query='mutation{UpdateProfile(email:"'+email+'",name:"'+name+'",surname:"'+surname+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  UpdateUserSkill(email:string,skill_name:string):Observable<any>
  {
    const Query='mutation{UpdateUserSkill(email:"'+email+'",skillName:"'+skill_name+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  GetMonthlyUtilization(email:string):Observable<any>
  {
    const Query='query{GetMonthlyUtilization(email:"'+email+'"){Week1,Week2,Week3,Week4,Average,Month}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }

  storeData(data:any)
  {
    this.earlyOBJ=data;
  }

  getData():Observable<any[]>
  {
    return this.earlyOBJ;
  }

}
