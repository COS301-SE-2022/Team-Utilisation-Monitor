import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAdminTopnavComponent } from './comp-admin-topnav.component';

describe('CompAdminTopnavComponent', () => {
  let component: CompAdminTopnavComponent;
  let fixture: ComponentFixture<CompAdminTopnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompAdminTopnavComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompAdminTopnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
