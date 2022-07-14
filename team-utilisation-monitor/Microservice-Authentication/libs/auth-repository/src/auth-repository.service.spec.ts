import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepositoryService } from './auth-repository.service';

describe('AuthRepositoryService', () => {
  let service: AuthRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthRepositoryService],
    }).compile();

    service = module.get<AuthRepositoryService>(AuthRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
