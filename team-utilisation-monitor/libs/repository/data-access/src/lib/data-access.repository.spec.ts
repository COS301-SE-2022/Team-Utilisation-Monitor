import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services'

describe('DataAccessRepository', () => {
  let controller: DataAccessRepository;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [DataAccessRepository],
  //   }).compile();

  //   provider = module.get<DataAccessRepository>(DataAccessRepository);
  // });

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    controllers : [DataAccessRepository],
    providers: [PrismaService],
  }).compile();

  controller = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  
});
