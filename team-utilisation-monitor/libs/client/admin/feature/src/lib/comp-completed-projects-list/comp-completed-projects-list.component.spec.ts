import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompCompletedProjectsListComponent } from './comp-completed-projects-list.component';

describe('CompCompletedProjectsListComponent', () => {
  let component: CompCompletedProjectsListComponent;
  let fixture: ComponentFixture<CompCompletedProjectsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompCompletedProjectsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompCompletedProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
