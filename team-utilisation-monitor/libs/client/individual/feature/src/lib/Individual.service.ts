import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(private client:HttpClient,private cookie:CookieService){}

  earlyOBJ:any

  //QUERIES
  getPersonDetails(email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    
    const query='query{getOnePerson(email:"'+email+'",token:"'+token+'"){id,name,surname,email,company_name,role,approved,team_name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object= this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: query }), options);

    return object;

  }

  getSkills():Observable<any>
  {

    const Query='query{GetSkill{skill}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    
    return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);

  }

  getAllocatedTeams(email:string):Observable<any>
  {
    const token=this.cookie.get("token");

    const Query='query{GetAllocatedTeams(email:"'+email+'",token:"'+token+'"){team_name}}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

   return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  getAllocatedProjects(email:string):Observable<any>
  {
    const token=this.cookie.get("token");

    const Query='query{GetAllocateProjects(email:"'+email+'",token:"'+token+'"){project_name}}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  getUserSkills(email:string):Observable<any>
  {
    const token=this.cookie.get("token");
    
    const Query='query{GetUserSkills(email:"'+email+'",token:"'+token+'")}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  getUserStats(email:string):Observable<any>
  {
    
    const token=this.cookie.get("token");

    const Query='query{GetUserStats(email:"'+email+'",token:"'+token+'"){numberOfTeams,numberOfSkills,numberOfProjects,utilisation}}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

 


  //Mutations
  UpdateProfile(email:string,name:string,surname:string):Observable<any>
  {
    const token=this.cookie.get("token");

    const Query='mutation{UpdateProfile(email:"'+email+'",name:"'+name+'",surname:"'+surname+'",token:"'+token+'")}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  UpdateUserSkill(email:string,skill_name:string):Observable<any>
  {
    const token=this.cookie.get("token");

    const Query='mutation{UpdateUserSkill(email:"'+email+'",skillName:"'+skill_name+'",token:"'+token+'")}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  GetMonthlyUtilization(email:string):Observable<any>
  {
    const token=this.cookie.get("token");

    const Query='query{GetMonthlyUtilization(email:"'+email+'",token:"'+token+'"){Week1,Week2,Week3,Week4,Average,Month}}'
    
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }

  storeData(data:any)
  {
    this.earlyOBJ=data;
  }

  getData():Observable<any[]>
  {
    return this.earlyOBJ;
  }

  /****
   * Use this function to verify tokens against the authentication database.
   * Returns true if the token is valid and false otherwise 
  */

  verifyToken(token:string):Observable<any>
  {
     const query='query{verifyToken(token:"'+token+'")}'
 
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
 
    const obj= this.client.post<any>('http://localhost:8080/graphql',JSON.stringify({ query: query }), options);
 
    return obj;
  }

  getTrendingSkill(email:string):Observable<any>
  {
    const token=this.cookie.get("token");

   const Query= 'query{getTrendSkill(token:"'+token+'",email:"'+email+'"){name,icon,type,level,description,skillsNeeded,benefits}}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://ec2-3-84-217-153.compute-1.amazonaws.com:6517/graphql',JSON.stringify({ query: Query }), options);
  }



}
