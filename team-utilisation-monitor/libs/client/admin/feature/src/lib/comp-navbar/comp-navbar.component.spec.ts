import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompNavbarComponent } from './comp-navbar.component';

describe('CompNavbarComponent', () => {
  let component: CompNavbarComponent;
  let fixture: ComponentFixture<CompNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompNavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
