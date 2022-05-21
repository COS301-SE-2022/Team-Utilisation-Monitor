import { Test } from '@nestjs/testing';
import { SharedServicesPrismaServicesService } from './shared-services-prisma-services.service';

describe('SharedServicesPrismaServicesService', () => {
  let service: SharedServicesPrismaServicesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [SharedServicesPrismaServicesService],
    }).compile();

    service = module.get(SharedServicesPrismaServicesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
