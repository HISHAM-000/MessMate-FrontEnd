import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalActionsComponent } from './approval-actions.component';

describe('ApprovalActionsComponent', () => {
  let component: ApprovalActionsComponent;
  let fixture: ComponentFixture<ApprovalActionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovalActionsComponent]
    });
    fixture = TestBed.createComponent(ApprovalActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
