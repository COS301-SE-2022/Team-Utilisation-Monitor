import { Module } from '@nestjs/common';
import { ApiFeatureResolver } from './api-feature/api-feature.resolver';

@Module({
  controllers: [],
  providers: [ApiFeatureResolver],
  exports: [],
})
export class ApiFeatureModule {}
