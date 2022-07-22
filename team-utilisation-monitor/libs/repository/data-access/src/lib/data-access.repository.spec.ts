import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

describe('DataAccessRepository', () => {
  let provider: DataAccessRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessRepository],
    }).compile();

    provider = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  // to do
  // it('should be defined', () => {
  //   expect(provider).getTeam();
  // });
  
});
