import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCreateProjectPopupComponent } from './comp-create-project-popup.component';

describe('CompCreateProjectPopupComponent', () => {
  let component: CompCreateProjectPopupComponent;
  let fixture: ComponentFixture<CompCreateProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompCreateProjectPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompCreateProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
