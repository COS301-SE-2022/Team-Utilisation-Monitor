import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualHomePageComponent } from './individual-home-page.component';

describe('IndividualHomePageComponent', () => {
  let component: IndividualHomePageComponent;
  let fixture: ComponentFixture<IndividualHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
