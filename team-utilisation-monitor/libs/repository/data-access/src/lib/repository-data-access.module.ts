import { Module } from '@nestjs/common';
import { DataAccessRepository } from './data-access.repository';

@Module({
  controllers: [],
  providers: [DataAccessRepository],
  exports: [DataAccessRepository],
})
export class RepositoryDataAccessModule {}
