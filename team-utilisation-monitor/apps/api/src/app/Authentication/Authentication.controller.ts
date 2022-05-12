import { Controller,Get,Post ,Body} from "@nestjs/common";
import { AuthenticationService } from "./Authentication.service";

@Controller()
export class AuthenticationController{
  constructor(private authService:AuthenticationService){}

  @Post('sign_up')
  addUser(@Body('username') comName:string,@Body('exampleInputPassword1') password:string,@Body('exampleInputEmail1') email:string)
  {
    return this.authService.addUser(comName,password,email);
  }

  @Get('loginDetails')
  getUser()
  {
    return this.authService.getUser();
  }
}
