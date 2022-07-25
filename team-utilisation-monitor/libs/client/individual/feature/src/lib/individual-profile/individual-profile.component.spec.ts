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

  it("testing title", ()=>{
    expect(component.companyName).toBe("");
  });

  it("tests html element", ()=>{
    const data=fixture.nativeElement;
    expect(data.querySelector(".some").textContent).toContain("user");
  });

  it("testing functions", ()=>{
    

  }
});
