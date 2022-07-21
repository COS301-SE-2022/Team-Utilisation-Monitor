import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class IndividualService {

  constructor(private client:HttpClient){}

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

  UpdateProfile(email:string,name:string,surname:string,skill_name:string):Observable<any>
  {
    const Query='mutation{UpdateProfile(email:"'+email+'",name:"'+name+'",surname:"'+surname+'",skill_name:"'+skill_name+'")}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);
  }


}
