import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCreateTeamPopupComponent } from './comp-create-team-popup.component';

describe('CompCreateTeamPopupComponent', () => {
  let component: CompCreateTeamPopupComponent;
  let fixture: ComponentFixture<CompCreateTeamPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompCreateTeamPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompCreateTeamPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
