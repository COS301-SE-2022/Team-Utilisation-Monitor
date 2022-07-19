import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompAddSkillsPopupComponent } from './comp-add-skills-popup.component';

describe('CompAddSkillsPopupComponent', () => {
  let component: CompAddSkillsPopupComponent;
  let fixture: ComponentFixture<CompAddSkillsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompAddSkillsPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompAddSkillsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
