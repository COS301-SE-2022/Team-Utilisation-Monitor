import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationGraphComponent } from './utilization-graph.component';

describe('UtilizationGraphComponent', () => {
  let component: UtilizationGraphComponent;
  let fixture: ComponentFixture<UtilizationGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilizationGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilizationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
