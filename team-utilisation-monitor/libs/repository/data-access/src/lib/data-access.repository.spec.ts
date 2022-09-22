import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';



describe('DataAccessRepository', () => {

  let repository: DataAccessRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessRepository, PrismaService],
    }).compile();

    repository = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  // to do
  // it('should be defined', () => {
  //   expect(provider).getTeam();
  // });
  
});
