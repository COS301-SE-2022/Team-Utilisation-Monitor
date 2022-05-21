import { Controller, Get } from '@nestjs/common';
import { ServiceFeatureService } from './service-feature.service';

@Controller('service-feature')
export class ServiceFeatureController {
  constructor(private serviceFeatureService: ServiceFeatureService) {}


  @Get()
  hello()
  {
    return 'Services is working!'
  }
}
