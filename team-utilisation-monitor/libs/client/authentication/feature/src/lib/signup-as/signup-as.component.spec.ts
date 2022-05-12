import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsComponent } from './signup-as.component';

describe('SignupAsComponent', () => {
  let component: SignupAsComponent;
  let fixture: ComponentFixture<SignupAsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
