import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  perm:any;
  id="";     //The cookie value
  array:any;
  array2:any;
  constructor(private client:HttpClient){}

  addCompany()
  {
    console.log(this.client.post("https://localhost:3333/api/sign_up",{'username':'Theo Thangeni','exampleInputPassword1':'HAYHSHAG','exampleInputEmail1':'masa@gmail.com'}))
  }

  addUser(data:any)
  {
    console.log("user");
  }

  getUserName()
  {
    this.client.get("https://localhost:3333/api/loginDetails")
    .subscribe(data=>{
      //alert(JSON.stringify(data));
      this.perm=data;
    });

    return this.perm;
  }
}
