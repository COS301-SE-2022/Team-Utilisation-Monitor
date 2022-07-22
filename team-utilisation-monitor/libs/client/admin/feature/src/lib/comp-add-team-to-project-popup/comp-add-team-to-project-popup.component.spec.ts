import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddTeamToProjectPopupComponent } from './comp-add-team-to-project-popup.component';

describe('CompAddTeamToProjectPopupComponent', () => {
  let component: CompAddTeamToProjectPopupComponent;
  let fixture: ComponentFixture<CompAddTeamToProjectPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompAddTeamToProjectPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompAddTeamToProjectPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
