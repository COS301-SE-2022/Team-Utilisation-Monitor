import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Component, DebugElement, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';

import { LoginComponent, User } from './login.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
    fixture.detectChanges();
  });

                                                                                //TEST FOR CREATION
  it('should create', () => {
    expect(component).toBeTruthy();
  });

                                                                                //TEST FOR INPUT
  //changing the input property enabled on our component.
  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
  });

  //check the disabled property value of the buttons DOM element
  it('Setting enabled to false disables the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
});

                                                                                //  OUTPUT TESTING
// tracking what gets emitted by the output event
it('Entering users correct details emits loggedIn event', () => {
  let user= new User('test@gmail.com',"PasssPass");

  component.loggedIn.subscribe((value) => user = value);
  expect(user.email).toBe("test@gmail.com");
  expect(user.password).toBe("PasssPass");
});

it('Entering email and password emits loggedIn event', () => {
  
  let user= new User('test@gmail.com',"PasssPass");
  loginEl.nativeElement.value = "test@gmail.com";
  passwordEl.nativeElement.value = "PasssPass";

  component.loggedIn.subscribe((value) => user = value);

  submitEl.triggerEventHandler('click', null);

  expect(user.email).toBe("test@example.com");
  expect(user.password).toBe("123456");
});
});
