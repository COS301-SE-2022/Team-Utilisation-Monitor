import { Test, TestingModule } from '@nestjs/testing';
import { ClientAuthenticationServiceService } from './client-authentication-service.service';

describe('ClientAuthenticationServiceService', () => {
  let service: ClientAuthenticationServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAuthenticationServiceService],
    }).compile();

    service = module.get<ClientAuthenticationServiceService>(
      ClientAuthenticationServiceService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
