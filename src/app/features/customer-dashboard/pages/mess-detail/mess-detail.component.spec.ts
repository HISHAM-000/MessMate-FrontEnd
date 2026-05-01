import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessDetailComponent } from './mess-detail.component';

describe('MessDetailComponent', () => {
  let component: MessDetailComponent;
  let fixture: ComponentFixture<MessDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessDetailComponent]
    });
    fixture = TestBed.createComponent(MessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
