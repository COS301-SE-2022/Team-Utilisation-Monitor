import { Module } from '@nestjs/common';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';
import { QueryHandlers } from './queries/handlers';
import { ServiceFeatureController } from './service-feature.controller';
import { ServiceFeatureService } from './service-feature.service';
import { CommandHandlers } from './commands/handlers';
import { FunctionsModule } from './functions/functions.module';
import { FunctionsService } from './functions/functions.service';

@Module({
  imports: [CqrsModule, FunctionsModule],
  controllers: [ServiceFeatureController],
  providers: [
    ServiceFeatureService,
    ...QueryHandlers,
    ...CommandHandlers,
    DataAccessRepository,
    PrismaService,
    FunctionsService
  ],
  exports: [ServiceFeatureService],
})
export class ServiceFeatureModule {}
