import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompTeamIndividualComponent } from './comp-team-individual.component';

describe('CompTeamIndividualComponent', () => {
  let component: CompTeamIndividualComponent;
  let fixture: ComponentFixture<CompTeamIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompTeamIndividualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompTeamIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
