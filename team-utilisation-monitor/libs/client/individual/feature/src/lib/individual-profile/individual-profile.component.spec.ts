import {  HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { format } from 'path';
import { IndividualProfileComponent } from './individual-profile.component';

fdescribe('IndividualProfileComponent', () => {
  let component: IndividualProfileComponent;
  let fixture: ComponentFixture<IndividualProfileComponent>;

  class form {
    // getter properties wait to query the DOM until called.
    get buttons() {
      return this.queryAll<HTMLButtonElement>('button');
    }
    get saveBtn() {
      return this.buttons[0];
    }
    
    get nameDisplay() {
      return this.query<HTMLElement>('span');
    }
    get nameInput() {
      return this.query<HTMLInputElement>('input');
    }
  
    //// query helpers ////
    private query<T>(selector: string): T {
      return fixture.nativeElement.querySelector(selector);
    }
  
    private queryAll<T>(selector: string): T[] {
      return fixture.nativeElement.querySelectorAll(selector);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualProfileComponent ],
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndividualProfileComponent);
    component = fixture.componentInstance;
    const Form= new form();

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
    
      fixture.detectChanges();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
