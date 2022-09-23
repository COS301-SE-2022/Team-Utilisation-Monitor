import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessRepository } from './data-access.repository';

import { PrismaService } from '@team-utilisation-monitor/shared/services/prisma-services';



describe('DataAccessRepository', () => {

  let repository: DataAccessRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessRepository, PrismaService],
    }).compile();

    repository = module.get<DataAccessRepository>(DataAccessRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('@returnObject', () => {
        
    const id = 1;
    const name = "Rourke";
    const surname = "Amiss";
    const email= "test@example.com";
    const role = "tester";
    const suspended = false;
    const position = "intern";
    const company_name = "UP";
    const company_id = 123;

    it('should return a user object', () => {
      try {
        const user = repository.returnObject(id, name, surname, email, suspended, role, company_name, position, company_id);
        expect(user).toEqual(user);
      } catch (error) { 
        fail(error)
      }
    })
  }); 

  // to do

  
});
