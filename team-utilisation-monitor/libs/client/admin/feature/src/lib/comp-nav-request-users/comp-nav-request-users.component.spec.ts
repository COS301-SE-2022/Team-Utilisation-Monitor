import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNavRequestUsersComponent } from './comp-nav-request-users.component';

describe('CompNavRequestUsersComponent', () => {
  let component: CompNavRequestUsersComponent;
  let fixture: ComponentFixture<CompNavRequestUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompNavRequestUsersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompNavRequestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
