import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class ClientAuthenticationServiceService {

    constructor(private readonly httpClient:HttpClient){}

    login(email:string,password:string):Observable<any>{
        const query='query{login(email:"'+email+'",password:"'+password+'"){name}}';

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