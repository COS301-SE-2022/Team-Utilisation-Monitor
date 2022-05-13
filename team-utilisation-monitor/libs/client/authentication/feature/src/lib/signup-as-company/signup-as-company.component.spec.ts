import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsCompanyComponent } from './signup-as-company.component';

describe('SignupAsCompanyComponent', () => {
  let component: SignupAsCompanyComponent;
  let fixture: ComponentFixture<SignupAsCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
