import { Module } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';
import { QueryHandlers } from './queries/handlers';
import { ServiceFeatureController } from './service-feature.controller';
import { ServiceFeatureService } from './service-feature.service';

@Module({
  imports:[CqrsModule],
  controllers: [ServiceFeatureController],
  providers: [
    ServiceFeatureService, 
    ...QueryHandlers,
    DataAccessRepository,
    PrismaService],
  exports: [ServiceFeatureService],
})
export class ServiceFeatureModule {}
