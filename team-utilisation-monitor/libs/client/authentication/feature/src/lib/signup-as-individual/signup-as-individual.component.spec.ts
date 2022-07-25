import { HttpClient} from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {HttpClientTestingModule} from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupAsIndividualComponent } from './signup-as-individual.component';

describe('SignupAsIndividualComponent', () => {
  let component: SignupAsIndividualComponent;
  let fixture: ComponentFixture<SignupAsIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupAsIndividualComponent ],
      imports: [HttpClientTestingModule],
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
