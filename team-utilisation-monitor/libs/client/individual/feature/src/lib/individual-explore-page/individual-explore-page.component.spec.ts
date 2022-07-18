import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualExplorePageComponent } from './individual-explore-page.component';

describe('IndividualExplorePageComponent', () => {
  let component: IndividualExplorePageComponent;
  let fixture: ComponentFixture<IndividualExplorePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualExplorePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualExplorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
