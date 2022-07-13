import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResolversResolver } from './authentication-resolvers.resolver';

describe('AuthenticationResolversResolver', () => {
  let resolver: AuthenticationResolversResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthenticationResolversResolver],
    }).compile();

    resolver = module.get<AuthenticationResolversResolver>(AuthenticationResolversResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
