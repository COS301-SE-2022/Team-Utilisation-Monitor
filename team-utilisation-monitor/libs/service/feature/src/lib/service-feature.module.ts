import { Module } from '@nestjs/common';
import { ServiceFeatureController } from './service-feature.controller';
import { ServiceFeatureService } from './service-feature.service';

@Module({
  controllers: [ServiceFeatureController],
  providers: [ServiceFeatureService],
  exports: [ServiceFeatureService],
})
export class ServiceFeatureModule {}
