import { Module } from '@nestjs/common';
import { PrismaService } from './shared-services-prisma-services.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class SharedServicesPrismaServicesModule {}
