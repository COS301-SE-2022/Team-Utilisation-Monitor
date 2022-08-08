import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  
  Admin:any

  constructor(private client:HttpClient,private readonly cookie:CookieService){}

  addAdmin(firstName:string,lastname :string,company:string,email:string)
  {
    const Query='mutation{createAdmin(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'",company_name:"'+company+'"){name,surname,email,company_name,company_id}}';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }
    const object=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query}),options)
    return object;
  }

  createUser(firstName:string,lastname :string,email:string,inviteCode:string):Observable<any>
  {
    const Query='mutation{createUser(name:"'+firstName+'",surname:"'+lastname+'",email:"'+email+'",inviteCode:"'+inviteCode+'"){name,surname,email,company_name,company_id,role,utilisation}}';

    console.log(Query);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
    }
    const object=this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }),options)

    return object;

  }
  /***
   * Use this function to get a user object.
   * The object accepts a valid email address. 
   * This function fetches the details from the main DB
  */

  getPersonDetails(email:string):Observable<any>
  {
    const token=this.cookie.get("token"); //token is working

    const query='query{getOnePerson(email:"'+email+'",token:"'+token+'"){id,name,surname,email,company_name,role,approved}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object= this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: query }), options);

    return object;
    
  }

  login(username:string,password:string):Observable<any>
  {
    const query='query{loginGateway(username:"'+username+'",password:"'+password+'"){id,username,token,role,name,surname}}'

    const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
    }

    const obj= this.client.post<any>('http://localhost:8080/graphql',JSON.stringify({ query: query }), options);

    return obj;
  }

  /***
   * This service is used to register the user. It's running on the authentication Database
   * Hence why it's connecting to port 8080.
   * It's connecting to the container
  */

  registerUser(name:string,surname:string,username:string,password:string):Observable<any>
  {
    const Query='mutation{registerUserGateway(name:"'+name+'",surname:"'+surname+'",username:"'+username+'",password:"'+password+'"){id,username,token,role,name,surname}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object=this.client.post<any>('http://localhost:8080/graphql',JSON.stringify({ query: Query }), options)
    return object;
  }

  /***
   * This service is used to register the Admin. It's running on the authentication Database
   * Hence why it's connecting to port 8080
   * It's connecting to the container
  */

  registerAdmin(name:string,surname:string,username:string,password:string):Observable<any>
  {
    const Query='mutation{registerAdminGateway(name:"'+name+'",surname:"'+surname+'",username:"'+username+'",password:"'+password+'"){id,username,token,role,name,surname}}';

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    const object=this.client.post<any>('http://localhost:8080/graphql', JSON.stringify({ query: Query }), options)
    return object;

  }


  /****
   * This function is used used to set the token when the user logs in.
   * This function is automatically triggered.
   * Function returns true if token is successfully triggered
  */

  setActiveToken(email:string,token:string):Observable<any>{

    const Query= 'mutation{SetToken(email:"'+email+'",token:"'+token+'")}'

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

    return this.client.post<any>('http://localhost:3333/graphql',JSON.stringify({ query: Query }), options);

  }



}
