import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedMessComponent } from './approved-mess.component';

describe('ApprovedMessComponent', () => {
  let component: ApprovedMessComponent;
  let fixture: ComponentFixture<ApprovedMessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedMessComponent]
    });
    fixture = TestBed.createComponent(ApprovedMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
