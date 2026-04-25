import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMessComponent } from './browse-mess.component';

describe('BrowseMessComponent', () => {
  let component: BrowseMessComponent;
  let fixture: ComponentFixture<BrowseMessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrowseMessComponent]
    });
    fixture = TestBed.createComponent(BrowseMessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
