import { Test, TestingModule } from '@nestjs/testing';
import { ClientIndividualServiceService } from './client-individual-service.service';

describe('ClientIndividualServiceService', () => {
  let service: ClientIndividualServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientIndividualServiceService],
    }).compile();

    service = module.get<ClientIndividualServiceService>(
      ClientIndividualServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
