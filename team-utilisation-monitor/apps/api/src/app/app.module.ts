import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceFeatureModule } from '@team-utilisation-monitor/service/feature';
import {ApiFeatureModule} from '@team-utilisation-monitor/api/feature'
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';

/***
 * ApiFeatureModule contains the resolver.
 */

@Module({
  imports: [ApiFeatureModule,ServiceFeatureModule],
  controllers: [AppController],
  providers: [AppService,DataAccessRepository,PrismaService],
})
export class AppModule {}
