import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompGraphCompanyUtilizationComponent } from './comp-graph-company-utilization.component';

describe('CompGraphCompanyUtilizationComponent', () => {
  let component: CompGraphCompanyUtilizationComponent;
  let fixture: ComponentFixture<CompGraphCompanyUtilizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompGraphCompanyUtilizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompGraphCompanyUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
