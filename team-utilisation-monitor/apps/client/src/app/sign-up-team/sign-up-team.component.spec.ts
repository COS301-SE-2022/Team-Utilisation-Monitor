import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTeamComponent } from './sign-up-team.component';

describe('SignUpTeamComponent', () => {
  let component: SignUpTeamComponent;
  let fixture: ComponentFixture<SignUpTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
