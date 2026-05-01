import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDayComponent } from './menu-day.component';

describe('MenuDayComponent', () => {
  let component: MenuDayComponent;
  let fixture: ComponentFixture<MenuDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuDayComponent]
    });
    fixture = TestBed.createComponent(MenuDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
