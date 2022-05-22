import { Controller, Get, Param, Post } from '@nestjs/common';
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

}
