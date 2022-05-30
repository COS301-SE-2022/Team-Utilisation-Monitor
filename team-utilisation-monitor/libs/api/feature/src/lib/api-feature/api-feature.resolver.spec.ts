import { Test, TestingModule } from '@nestjs/testing';
import { UserPerson } from '@team-utilisation-monitor/api/shared/data-access';
import { ApiFeatureResolver } from './api-feature.resolver';

describe('ApiFeatureResolver', () => {
  let resolver: ApiFeatureResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiFeatureResolver],
    }).compile();

    resolver = module.get<ApiFeatureResolver>(ApiFeatureResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
  describe('@getName', ()=>{
    it('Should return the student object', async ()=> {
      expect((await resolver.getUser('123'))).toEqual(mockObject);
    })
  })
});

const mockObject = new UserPerson()
mockObject.id = 123;
mockObject.name = "Rourke";
mockObject.email = "icreatesoftware@gmail.com";

const input = new UserPerson()
mockObject.id = 124;
mockObject.name = "Amiss";
mockObject.email = "fakeemail@gmail.com";