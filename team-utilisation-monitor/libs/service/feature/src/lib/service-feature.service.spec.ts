import { Test } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';

describe('ServiceFeatureService', () => {
  let service: ServiceFeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceFeatureService],
    }).compile();

    service = module.get(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
