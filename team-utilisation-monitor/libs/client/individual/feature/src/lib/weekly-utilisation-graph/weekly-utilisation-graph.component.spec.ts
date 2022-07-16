import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyUtilisationGraphComponent } from './weekly-utilisation-graph.component';

describe('WeeklyUtilisationGraphComponent', () => {
  let component: WeeklyUtilisationGraphComponent;
  let fixture: ComponentFixture<WeeklyUtilisationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklyUtilisationGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyUtilisationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
