import { RouterTestingModule } from '@angular/router/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupAsIndividualComponent } from './signup-as-individual.component';


describe('SignupAsIndividualComponent', () => {
  let component: SignupAsIndividualComponent;
  let fixture: ComponentFixture<SignupAsIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsIndividualComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule],
      providers: [SignupAsIndividualComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupAsIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

it('call login() failed',()=>{
  const msg='status 500 error';
  const input={
    username:'admin',
    passowrd:'admin'
  }
});
