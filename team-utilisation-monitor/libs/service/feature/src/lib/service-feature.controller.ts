import { Controller, Get } from '@nestjs/common';
import { ServiceFeatureService } from './service-feature.service';

@Controller('service-feature')
export class ServiceFeatureController {

  constructor(private service: ServiceFeatureService) {}

  @Get()
  getAllPersons()
  {
    this.service.getAllUserPerson();
  }
}
