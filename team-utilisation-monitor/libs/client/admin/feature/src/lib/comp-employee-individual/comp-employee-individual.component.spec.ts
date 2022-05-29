import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompEmployeeIndividualComponent } from './comp-employee-individual.component';

describe('CompEmployeeIndividualComponent', () => {
  let component: CompEmployeeIndividualComponent;
  let fixture: ComponentFixture<CompEmployeeIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompEmployeeIndividualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompEmployeeIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
