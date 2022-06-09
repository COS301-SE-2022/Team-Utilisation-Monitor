import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTeamListComponent } from './comp-team-list.component';

describe('CompTeamListComponent', () => {
  let component: CompTeamListComponent;
  let fixture: ComponentFixture<CompTeamListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompTeamListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompTeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
