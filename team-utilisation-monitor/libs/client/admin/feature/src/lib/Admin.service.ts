import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  constructor(private http:HttpClient){}

  getAdmins(companyName:string)
  {
    //
  }

  getEmployees(companyName:string) //:Observable<any>
  {
    //
  }

  getNumProjects(companyName:string)
  {
    //
  }

  getPendingRequests(componygName:string)
  {
    //
  }


}
