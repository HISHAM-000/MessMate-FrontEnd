import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingMessComponent } from './pending-mess.component';

describe('PendingMessComponent', () => {
  let component: PendingMessComponent;
  let fixture: ComponentFixture<PendingMessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PendingMessComponent]
    });
    fixture = TestBed.createComponent(PendingMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
