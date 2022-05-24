import { async, TestBed } from '@angular/core/testing';
import { ClientAdminFeatureModule } from './client-admin-feature.module';

describe('ClientAdminFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientAdminFeatureModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(ClientAdminFeatureModule).toBeDefined();
  });
});
