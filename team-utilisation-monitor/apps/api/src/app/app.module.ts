import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationController } from './Authentication/Authentication.controller';
import { AuthenticationModule } from './Authentication/Authentication.module';
import { AuthenticationService } from './Authentication/Authentication.service';
import { ServiceFeatureModule } from '@team-utilisation-monitor/service/feature';

@Module({
  imports: [AuthenticationModule,ServiceFeatureModule],
  controllers: [AppController,AuthenticationController],
  providers: [AppService,AuthenticationService],
})
export class AppModule {}
