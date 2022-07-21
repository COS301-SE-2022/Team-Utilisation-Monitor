import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFeatureService } from './service-feature.service';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('ServiceFeatureService', () => {
  let service: ServiceFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [ServiceFeatureService],
    }).compile();

    service = module.get<ServiceFeatureService>(ServiceFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

/*
getOnePersonVEmail(arg_email:string):Promise<UserPerson|string>
getTeam(team_ID:number):Promise<TeamEntity>
getCompanyVName(f_company_name:string):Promise<UserCompany|null>
getEmployeesOfCompany(companyName:string):Promise<UserPerson[]>
getCompanyVID(f_id:number):Promise<UserCompany|null>
*/