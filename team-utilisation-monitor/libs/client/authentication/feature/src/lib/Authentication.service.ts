import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private client:HttpClient){}

  addCompany(company:any)
  {
    this.client.post<any>("https://localhost:3333/api",company)
  }

  addUser(data:any)
  {
    this.client.post<any>("https://localhost:3333/api", data);
  }

}
