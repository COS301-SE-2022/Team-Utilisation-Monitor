import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsTeamComponent } from './signup-as-team.component';

describe('SignupAsTeamComponent', () => {
  let component: SignupAsTeamComponent;
  let fixture: ComponentFixture<SignupAsTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
