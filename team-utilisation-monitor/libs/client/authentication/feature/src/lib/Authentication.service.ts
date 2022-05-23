import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private client:HttpClient){}

  addCompany(firstName:string,lastname :string,company:string,email:string,password:string)
  {
    const Query='query{signUpPerson(name:"'+firstName+'",surname:"'+lastname+'",company:"'+company+'",email:"'+email+'",password:"'+password+'"){}}';
    this.client.post<any>("https://localhost:3333/graphql",company)
  }

  addUser(firstName:string,lastname :string,company:string,email:string,password:string)
  {
    const Query='query{signUpPerson(name:"'+firstName+'",surname:"'+lastname+'",company:"'+company+'",email:"'+email+'",password:"'+password+'"){}}';
    this.client.post<any>("https://localhost:3333/graphql",JSON.stringify({query:Query}));
  }

}
