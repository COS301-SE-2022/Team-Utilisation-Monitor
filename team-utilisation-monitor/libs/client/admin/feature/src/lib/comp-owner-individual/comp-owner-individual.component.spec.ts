import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOwnerIndividualComponent } from './comp-owner-individual.component';

describe('CompOwnerIndividualComponent', () => {
  let component: CompOwnerIndividualComponent;
  let fixture: ComponentFixture<CompOwnerIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompOwnerIndividualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompOwnerIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
