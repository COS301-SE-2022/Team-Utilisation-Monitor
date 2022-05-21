import { Injectable } from "@nestjs/common";
import { UserModel } from "./User.model";


@Injectable()
export class AuthenticationService{
  users:UserModel[];

  addUser(companyName:string,Password:string,email:string)
  {
    const user=new UserModel(companyName,Password,email);
    this.users.push(user);
    return companyName+" succesfully registered";
  }

  getUser()
  {
    return {'companyName':'Oracle','email':'Oracle@gmail.com'}
  }
}
