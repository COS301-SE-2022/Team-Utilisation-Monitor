import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddPositionsPopupComponent } from './comp-add-positions-popup.component';

describe('CompAddPositionsPopupComponent', () => {
  let component: CompAddPositionsPopupComponent;
  let fixture: ComponentFixture<CompAddPositionsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompAddPositionsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompAddPositionsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
