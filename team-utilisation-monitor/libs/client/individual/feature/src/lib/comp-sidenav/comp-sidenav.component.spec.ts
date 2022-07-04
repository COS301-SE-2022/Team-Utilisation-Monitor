import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompSidenavComponent } from './comp-sidenav.component';

describe('CompSidenavComponent', () => {
  let component: CompSidenavComponent;
  let fixture: ComponentFixture<CompSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompSidenavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
