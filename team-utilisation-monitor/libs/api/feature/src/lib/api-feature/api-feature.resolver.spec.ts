import { Test, TestingModule } from '@nestjs/testing';
import { ApiFeatureResolver } from './api-feature.resolver';

describe('ApiFeatureResolver', () => {
  let resolver: ApiFeatureResolver;

  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFeatureResolver],
    })
      .compile();

    resolver = module.get<ApiFeatureResolver>(ApiFeatureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
