import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';
import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services'

import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access'
describe('DataAccessRepository', () => {
  let controller: DataAccessRepository;

  const mockUserObject = {
    getOnePersonVEmail: jest.fn(UserPerson => {
      return {
        id: 123, 
        name: "rourke",
        surname: "amiss",
        email: "foo@bar.com",
        ...UserPerson
      }
    })
  };

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [DataAccessRepository],
  //   }).compile();

  //   provider = module.get<DataAccessRepository>(DataAccessRepository);
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataAccessRepository],
      providers: [PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockUserObject)
      .compile();

    controller = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a UserPerson', () => {
    expect(controller.getOnePersonVEmail('foo@bar.com')).toEqual(UserPerson)
    
  })
  
});

/*
getOnePersonVEmail(arg_email:string):Promise<UserPerson|string>
getTeam(team_ID:number):Promise<TeamEntity>
getCompanyVName(f_company_name:string):Promise<UserCompany|null>
getEmployeesOfCompany(companyName:string):Promise<UserPerson[]>
getCompanyVID(f_id:number):Promise<UserCompany|null>
*/