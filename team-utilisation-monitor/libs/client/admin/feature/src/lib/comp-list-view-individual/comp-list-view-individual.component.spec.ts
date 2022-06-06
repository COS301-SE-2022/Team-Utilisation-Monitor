import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListViewIndividualComponent } from './comp-list-view-individual.component';

describe('CompListViewIndividualComponent', () => {
  let component: CompListViewIndividualComponent;
  let fixture: ComponentFixture<CompListViewIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompListViewIndividualComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompListViewIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
