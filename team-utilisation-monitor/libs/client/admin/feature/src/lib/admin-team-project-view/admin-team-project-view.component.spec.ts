import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamProjectViewComponent } from './admin-team-project-view.component';

describe('AdminTeamProjectViewComponent', () => {
  let component: AdminTeamProjectViewComponent;
  let fixture: ComponentFixture<AdminTeamProjectViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTeamProjectViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminTeamProjectViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
