import { Module } from '@nestjs/common';
import { DataAccessRepository } from '@team-utilisation-monitor/repository/data-access';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';
import { FunctionsService } from './functions.service';

@Module({
  providers: [FunctionsService,DataAccessRepository,PrismaService],
  imports:[],
  exports:[FunctionsService]
})
export class FunctionsModule {}
