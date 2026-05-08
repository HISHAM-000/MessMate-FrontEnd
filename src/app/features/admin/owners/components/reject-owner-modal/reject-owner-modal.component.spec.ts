import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectOwnerModalComponent } from './reject-owner-modal.component';

describe('RejectOwnerModalComponent', () => {
  let component: RejectOwnerModalComponent;
  let fixture: ComponentFixture<RejectOwnerModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectOwnerModalComponent]
    });
    fixture = TestBed.createComponent(RejectOwnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
