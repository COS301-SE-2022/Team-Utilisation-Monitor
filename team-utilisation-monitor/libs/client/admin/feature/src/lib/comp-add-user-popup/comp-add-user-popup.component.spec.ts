import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddUserPopupComponent } from './comp-add-user-popup.component';

describe('CompAddUserPopupComponent', () => {
  let component: CompAddUserPopupComponent;
  let fixture: ComponentFixture<CompAddUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompAddUserPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompAddUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
