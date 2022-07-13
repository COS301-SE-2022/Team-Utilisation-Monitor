import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolverService } from './auth-resolver.service';

describe('AuthResolverService', () => {
  let service: AuthResolverService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthResolverService],
    }).compile();

    service = module.get<AuthResolverService>(AuthResolverService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
