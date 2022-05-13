import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsIndividualComponent } from './signup-as-individual.component';

describe('SignupAsIndividualComponent', () => {
  let component: SignupAsIndividualComponent;
  let fixture: ComponentFixture<SignupAsIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
