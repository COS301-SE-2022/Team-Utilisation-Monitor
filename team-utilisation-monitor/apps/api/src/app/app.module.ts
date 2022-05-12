import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from './Authentication/Authentication.controller';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { AuthenticationService } from './Authentication/Authentication.service';

@Module({
  imports: [AuthenticationModule],
  controllers: [AppController,AuthenticationController],
  providers: [AppService,AuthenticationService],
})
export class AppModule {}
