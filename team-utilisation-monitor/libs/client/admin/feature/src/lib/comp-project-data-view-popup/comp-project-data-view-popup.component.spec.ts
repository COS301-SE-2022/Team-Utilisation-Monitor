import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompProjectDataViewPopupComponent } from './comp-project-data-view-popup.component';

describe('CompProjectDataViewPopupComponent', () => {
  let component: CompProjectDataViewPopupComponent;
  let fixture: ComponentFixture<CompProjectDataViewPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompProjectDataViewPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompProjectDataViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
