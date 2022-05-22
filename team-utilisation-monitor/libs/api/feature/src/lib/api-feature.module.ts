import { Module } from '@nestjs/common';
import { ApiFeatureResolver } from './api-feature/api-feature.resolver';

@Module({
  controllers: [],
  providers: [ApiFeatureResolver],
  imports: [],
  exports: [ApiFeatureResolver],
})
export class ApiFeatureModule {}
