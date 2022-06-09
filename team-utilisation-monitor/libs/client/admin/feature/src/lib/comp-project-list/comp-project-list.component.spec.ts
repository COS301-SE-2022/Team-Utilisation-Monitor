import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompProjectListComponent } from './comp-project-list.component';

describe('CompProjectListComponent', () => {
  let component: CompProjectListComponent;
  let fixture: ComponentFixture<CompProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompProjectListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
