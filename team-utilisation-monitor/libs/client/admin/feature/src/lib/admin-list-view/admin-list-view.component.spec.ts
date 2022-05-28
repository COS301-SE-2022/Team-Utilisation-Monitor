import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListViewComponent } from './admin-list-view.component';

describe('AdminListViewComponent', () => {
  let component: AdminListViewComponent;
  let fixture: ComponentFixture<AdminListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminListViewComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
