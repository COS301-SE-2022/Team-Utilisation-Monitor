import { Controller, Get, Param, Post } from '@nestjs/common';
import { Role } from '@prisma/client';
import { ServiceFeatureService } from './service-feature.service';

@Controller('service-feature')
export class ServiceFeatureController {

  constructor(private service: ServiceFeatureService) {}

  @Get()
  getAllPersons():Promise<any|null>
  {
    return this.service.getAllUserPerson();
  }

  @Post(':email')
  async getOnePersonVEmailController(@Param('email')email:string):Promise<any|null>
  {
    return this.service.getOnePersonVEmailService(email);
  }

  @Post(':name/:surname/:email/:password/:role/:suspended/:company')
  async createUserPerosnController(@Param('name')name:string,@Param('surname')surname:string,@Param('email')email:string,@Param('password')password:string,@Param('role')role:Role,@Param('suspended')suspended:boolean,@Param('company')company:string)
  {
    return this.service.signup(name,surname,email,password,Role.USER,false,company);
  }

}
