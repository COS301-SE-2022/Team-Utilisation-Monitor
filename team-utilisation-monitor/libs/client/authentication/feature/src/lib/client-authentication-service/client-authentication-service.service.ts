import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ClientAuthenticationServiceService {

  constructor(private readonly httpClient:HttpClient){}

  login(email:string,password:string):Observable<any>
  {
    const query='query{login(email:"'+email+'",password:"'+password+'"){name}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    const obj= this.httpClient.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
        
    //console.log(obj);

    return obj;
  }

  signup(name:string,surname:string,email:string,role:string,suspended:string,password:string,company_name:string):Observable<any>
  {

    console.log("In SignUP-Service");

    const query='mutation{createPerson(name:"'+name+'",surname:"'+surname+'",email:"'+email+'",role:"'+role+'",suspended:"'+suspended+'",password:"'+password+'",company_name:"'+company_name+'"){name surname email role password suspended company_name}}';

    console.log(query);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    const obj= this.httpClient.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
        
    console.log(obj);

    return obj;

  }
    
}

/***
 * mutation{
  createPerson(name:"Gift",surname:"Monwa",email:"G@gmail.com",
  role:"USER",suspended:"false",password:"CodeCs",company_name:"theSoftCompany")
  {
    name
    surname
    email
    password
    role
    suspended
    company_name
  }
}
 */




/***
 * login(email: string, password: string): Observable<any> {
    const query = 'query{login(email: "' + email + '", password: "' + password + '"){id}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.httpClient.post<any>('https://301graduates.live:3333/graphql',JSON.stringify({ query: query }), options);
  }

 */