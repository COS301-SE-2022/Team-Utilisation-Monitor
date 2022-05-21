import { Test } from '@nestjs/testing';
import { ServiceFeatureController } from './service-feature.controller';
import { ServiceFeatureService } from './service-feature.service';

describe('ServiceFeatureController', () => {
  let controller: ServiceFeatureController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ServiceFeatureService],
      controllers: [ServiceFeatureController],
    }).compile();

    controller = module.get(ServiceFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
