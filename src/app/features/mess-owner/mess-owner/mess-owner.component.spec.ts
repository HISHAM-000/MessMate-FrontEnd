import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessOwnerComponent } from './mess-owner.component';

describe('MessOwnerComponent', () => {
  let component: MessOwnerComponent;
  let fixture: ComponentFixture<MessOwnerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessOwnerComponent]
    });
    fixture = TestBed.createComponent(MessOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
