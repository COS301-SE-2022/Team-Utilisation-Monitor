import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Admin:any

  constructor(private client:HttpClient){}

  addAdmin(firstName:string,lastname :string,company:string,email:string,password:string)
  {
    const Query='mutation{createAdmin(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'",password:"'+password+'",company_name:"'+company+'"){name,surname,email,company_name,company_id}}'
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }
    const object=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query}),options)
    return object;
  }

  createUser(firstName:string,lastname :string,email:string,password:string,inviteCode:string):Observable<any>
  {
    const query='mutation{createUser(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'", password:"'+password+'",inviteCode:"'+inviteCode+'"){id,name,surname}}'

    //const query='mutation{createUser(name:"Sharp",surname:"Tank",email:"shark@gmail.com",password:"theshartank",inviteCode:"no 167"){name,surname,email}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }

    const obj=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query}),options)
    return obj;
  }

  login(email:string,password:string):Observable<any>
  {
    const query='query{login(email:"'+email+'",password:"'+password+'"){name,surname,role,company_id,company_name}}';

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    const obj= this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);
    return obj;

}

}
