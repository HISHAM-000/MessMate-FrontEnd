import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResubmitApplicationComponent } from './resubmit-application.component';

describe('ResubmitApplicationComponent', () => {
  let component: ResubmitApplicationComponent;
  let fixture: ComponentFixture<ResubmitApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResubmitApplicationComponent]
    });
    fixture = TestBed.createComponent(ResubmitApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
