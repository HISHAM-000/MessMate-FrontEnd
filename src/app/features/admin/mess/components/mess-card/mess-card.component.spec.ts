import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessCardComponent } from './mess-card.component';

describe('MessCardComponent', () => {
  let component: MessCardComponent;
  let fixture: ComponentFixture<MessCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessCardComponent]
    });
    fixture = TestBed.createComponent(MessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
