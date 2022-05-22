import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceFeatureModule } from '@team-utilisation-monitor/service/feature';
import {ApiFeatureModule} from '@team-utilisation-monitor/api/feature'


@Module({
  imports: [ApiFeatureModule,ServiceFeatureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
