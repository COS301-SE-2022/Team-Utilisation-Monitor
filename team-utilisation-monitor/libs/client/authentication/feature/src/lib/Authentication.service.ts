import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private client:HttpClient){}

  addCompany(firstName:string,lastname :string,company:string,email:string,password:string)
  {
    const Query='query{signUpPerson(name:"'+firstName+'",surname:"'+lastname+'",company:"'+company+'",email:"'+email+'",password:"'+password+'"){}}';
    this.client.post<any>("https://localhost:3333/graphql",JSON.stringify({ query: Query}))
  }

  addUser(firstName:string,lastname :string,company:string,email:string,password:string)
  {
    const Query='query{signUpPerson(name:"'+firstName+'",surname:"'+lastname+'",company:"'+company+'",email:"'+email+'",password:"'+password+'"){}}';
    this.client.post<any>("https://localhost:3333/graphql",JSON.stringify({ query: Query}));
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
    return obj;

}

}
