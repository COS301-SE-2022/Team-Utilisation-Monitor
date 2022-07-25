import { ComponentFixture, TestBed } from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import { IndividualProfileComponent } from './individual-profile.component';

describe('IndividualProfileComponent', () => {
  let component: IndividualProfileComponent;
  let fixture: ComponentFixture<IndividualProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have primary color', () => {
    const container: HTMLElement = fixture.nativeElement.querySelector('mat-side-nav-container');
    const bgColor = container.style.color;
    expect(bgColor).toBe('primary');
  });



});
