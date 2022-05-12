import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpIndividualComponent } from './sign-up-individual.component';

describe('SignUpIndividualComponent', () => {
  let component: SignUpIndividualComponent;
  let fixture: ComponentFixture<SignUpIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
