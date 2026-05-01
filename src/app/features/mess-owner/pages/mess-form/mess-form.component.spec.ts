import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessFormComponent } from './mess-form.component';

describe('MessFormComponent', () => {
  let component: MessFormComponent;
  let fixture: ComponentFixture<MessFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessFormComponent]
    });
    fixture = TestBed.createComponent(MessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
