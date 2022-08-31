import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService,private repository:DataAccessRepository) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get(':test')
  getTestFunction():Promise<any|null>
  {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: 'This is a custom message',
    }, HttpStatus.FORBIDDEN);
  }

}
