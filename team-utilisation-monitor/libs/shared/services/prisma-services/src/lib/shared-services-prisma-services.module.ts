import { Module } from '@nestjs/common';
import { SharedServicesPrismaServicesService } from './shared-services-prisma-services.service';

@Module({
  controllers: [],
  providers: [SharedServicesPrismaServicesService],
  exports: [SharedServicesPrismaServicesService],
})
export class SharedServicesPrismaServicesModule {}
