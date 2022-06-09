import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddTeamMemberPopupComponent } from './comp-add-team-member-popup.component';

describe('CompAddTeamMemberPopupComponent', () => {
  let component: CompAddTeamMemberPopupComponent;
  let fixture: ComponentFixture<CompAddTeamMemberPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompAddTeamMemberPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompAddTeamMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
