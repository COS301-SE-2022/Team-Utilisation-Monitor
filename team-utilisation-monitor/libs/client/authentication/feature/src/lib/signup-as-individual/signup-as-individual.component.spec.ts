import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsIndividualComponent } from './signup-as-individual.component';

describe('SignupAsIndividualComponent', () => {
  let component: SignupAsIndividualComponent;
  let fixture: ComponentFixture<SignupAsIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsIndividualComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule, HttpTestingController],
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
